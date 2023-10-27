"use client";
import Button from "@/components/button";
import Label from "@/components/label";
import useApiPrivate from "@/hooks/apiPrivate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { queryClient } from "@/hooks/queryClient";
import { z } from "zod";
import Input from "@/components/input/input";
import { BsFillSendFill } from "react-icons/bs";
import { ChangeEvent, useState } from "react";
import { Event } from "../../types";
import { motion } from "framer-motion";

const createEventsFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  allDay: z.boolean(),
  description: z.string(),
  start: z.string(),
  end: z.string(),
  color: z.string(),
});

type CreateEventsFormData = z.infer<typeof createEventsFormSchema>;
type KeyOfEventsFormData = keyof CreateEventsFormData;
type OmitAllday = Omit<ControllerRenderProps, "allDay">;

interface LabelFormEventsDataProps {
  name: string;
  span?: string;
  ex?: string;
  type?: string;
  default?: string;
}

const variants = {
  pageInitial: { opacity: 0, x: 40, y: 0 },
  pageAnimate: { opacity: 1, x: 0, y: 0 },
};

const useDetails = (code: string) => {
  const api = useApiPrivate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEventsFormData>({
    resolver: zodResolver(createEventsFormSchema),
  });

  const [contentEventsComments, setContentEventsComments] =
    useState<string>("");

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", code],
    queryFn: async () => {
      return (await api.get(`/events/find/${code}`)).data;
    },
  });

  function onChangeContentEventsComments(e: ChangeEvent<HTMLInputElement>) {
    setContentEventsComments(e.target.value.toString());
  }

  async function updateEvents(data: CreateEventsFormData) {
    const updated = (await api.put(`/events/update/${event.id}`, data)).data;

    queryClient.setQueryData(["event", code], (prevData: any) => {
      return {
        ...prevData,
        ...updated,
        comments: prevData.comments ? [...prevData.comments] : [],
      };
    });

    queryClient.setQueryData(["event"], (prevData: any) => {
      return prevData?.map((item: Event) =>
        item.id === updated.id ? { ...item, ...updated } : item
      );
    });
  }

  async function createEventsComments() {
    const comment = (
      await api.post("/events-comments/create", {
        content: contentEventsComments,
        eventId: event.id,
      })
    ).data;

    queryClient.setQueryData(["event", code], (prevData: any) => {
      return {
        ...prevData,
        comments: prevData.comments ? [comment, ...prevData.comments] : [],
      };
    });
  }

  const labelFormEventsData = [
    { name: "name", span: "Nome" },
    {
      name: "start",
      span: "Começa em",
      default: moment
        .tz(event?.start?.toString(), "America/Sao_Paulo")
        .format("YYYY-MM-DDTHH:mm"),
      type: "datetime-local",
    },
    {
      name: "end",
      span: "Termina em",
      default: moment
        .tz(event?.end?.toString(), "America/Sao_Paulo")
        .format("YYYY-MM-DDTHH:mm"),
      type: "datetime-local",
    },
    {
      name: "description",
      span: "Descrição",
    },
  ];

  return {
    form: {
      handleSubmit,
      control,
      updateEvents,
      reset,
      labelFormEventsData,
      errors,
    },
    comments: {
      contentEventsComments,
      onChangeContentEventsComments,
      createEventsComments,
    },
    query: { event, isLoading },
  };
};

export default function Details({
  params: { code },
}: {
  params: {
    code: string;
  };
}) {
  const {
    form: { handleSubmit, control, updateEvents, reset, labelFormEventsData },
    comments: {
      contentEventsComments,
      onChangeContentEventsComments,
      createEventsComments,
    },
    query: { event, isLoading },
  } = useDetails(code);

  if (isLoading) {
    return;
  }

  return (
    <motion.main
      variants={variants}
      initial="pageInitial"
      animate="pageAnimate"
      transition={{ type: 'lienar'}}
    >
      <div className="w-full h-full flex gap-7 mt-5 relative justify-center flex-wrap">
        <div className="flex flex-col max-w-[65rem] gap-2 w-full justify-center items-center p-10">
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleSubmit(updateEvents)}
          >
            <div className="flex gap-4 justify-between flex-wrap">
              <div className="flex flex-col min-w-[20rem] w-full gap-3 mx-auto flex-1">
                <motion.div
                  className="w-full"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                      },
                    },
                  }}
                >
                  <div className="bg-cyan-400 opacity-80 p-4 rounded w-full h-auto">
                    <h2 className="text-lg text-black">Informações</h2>
                  </div>
                </motion.div>
                {labelFormEventsData.map(
                  (label: LabelFormEventsDataProps, index: number) => {
                    return (
                      <Controller
                        control={control}
                        key={index}
                        name={label.name as KeyOfEventsFormData}
                        defaultValue={label.default || event[label.name]}
                        render={({ field }: { field: OmitAllday }) => {
                          return (
                            <Label.Root className="m-0">
                              <Label.Title className="text-lg">
                                {label.span}
                              </Label.Title>
                              <input
                                {...field}
                                type={label?.type || "text"}
                                className="min-h-[3rem] bg-transparent focus:border-cyan-500 p-3 outline-none rounded border border-zinc-500 border-opacity-40"
                              />
                            </Label.Root>
                          );
                        }}
                      />
                    );
                  }
                )}
                <Controller
                  control={control}
                  name={"allDay"}
                  defaultValue={event.allDay}
                  render={({ field }) => {
                    return (
                      <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex text-lg">
                          O evento acontecerá todo o dia?
                        </div>
                        <Button
                          type="button"
                          className={`p-3 flex min-w-[7rem] justify-center items-center text-white rounded ${
                            !!field.value ? "bg-emerald-400" : "bg-rose-600"
                          }`}
                          onClick={() =>
                            field.onChange(field.value ? false : true)
                          }
                        >
                          {field.value ? "Ligado" : "Desligado"}
                        </Button>
                      </div>
                    );
                  }}
                />
                <Controller
                  control={control}
                  name={"color"}
                  defaultValue={event.color || "#01f9f1"}
                  render={({ field }: { field: OmitAllday }) => {
                    return <input {...field} type="color" />;
                  }}
                />
              </div>

              <div className="flex flex-col min-w-[20rem] gap-2 justify-center  mx-auto items-center flex-1">
                <motion.div
                  className="w-full"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                      },
                    },
                  }}
                >
                  <div className="bg-cyan-400 opacity-80 p-4 rounded w-full h-auto">
                    <h2 className="text-lg text-black opacity-80">
                      Meus Comentários
                    </h2>
                  </div>
                </motion.div>
                <div className="flex flex-1 bg-zinc-300 bg-opacity-10 w-full flex-col rounded">
                  <div className="p-2 w-full flex items-center gap-1">
                    <Input
                      onChange={onChangeContentEventsComments}
                      value={contentEventsComments}
                      placeholder="Exemple"
                      className="w-full p-3 rounded border border-zinc-500 border-opacity-20 bg-white bg-opacity-50 outline-none"
                    />
                    <Button
                      onClick={createEventsComments}
                      type="button"
                      className="w-14 flex items-center justify-center h-12 bg-cyan-500 rounded text-white "
                    >
                      <BsFillSendFill />
                    </Button>
                  </div>
                  <div className="flex flex-col p-3 gap-3 w-full flex-1 text-black max-h-[30rem] overflow-auto">
                    {event?.comments?.map((item: any, index: any) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 bg-cyan-300 opacity-70 hover:opacity-100 justify-center p-4 rounded pl-5 relative min-h-auto"
                      >
                        <div className="flex min-h-auto">
                          {moment
                            .tz(item.createdAt, "America/Sao_Paulo")
                            .format("MM/DD - HH[h]mm")}
                        </div>

                        <div className="flex w-full">
                          <span className="bg-cyan-600 h-full w-2 absolute top-0 left-0 rounded-l" />
                          <div className="flex-1 flex text-justify">
                            {item.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full gap-3">
              <Button
                onClick={() => reset()}
                type="button"
                className="bg-gradient-to-r rounded text-white from-cyan-500 to-blue-500 tex-tg flex p-4 "
              >
                Limpar
              </Button>
              <Button className="bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded text-white tex-tg flex justify-center p-4 px-10">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.main>
  );
}
