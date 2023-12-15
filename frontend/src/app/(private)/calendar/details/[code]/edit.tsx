"use client";

import { BsFillPersonLinesFill, BsPenFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import { AiOutlineClose } from "react-icons/ai";
import Label from "@/components/label";
import { Controller } from "react-hook-form";
import { fontOpenSans, fontRoboto } from "@/app/fonts";
import { z } from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { queryClient } from "@/hooks/queryClient";
import useApiPrivate from "@/hooks/apiPrivate";
import { useState } from "react";
import { Event } from "@/types/events";
import { AnimatePresence, motion } from "framer-motion";
import { colorsEvents } from "@/constants/colorsEvents";

import * as S from "./style";
import { InputColors } from "@/components/inputColors";

const createEventsFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  allDay: z.boolean(),
  description: z.string(),
  start: z.string(),
  end: z.string(),
  color: z.string(),
});

export type CreateEventsFormData = z.infer<typeof createEventsFormSchema>;
export type KeyOfEventsFormData = keyof CreateEventsFormData;
export type OmitAllday = Omit<ControllerRenderProps, "allDay">;

export interface LabelFormEventsDataProps {
  name: string;
  span?: string;
  ex?: string;
  type?: string;
  default?: string;
}

export function useFormDetails(event: Event | undefined) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEventsFormData>({
    resolver: zodResolver(createEventsFormSchema),
  });

  const handleEditingClient = () => setEditingClient((prev) => !prev);

  const [editingClient, setEditingClient] = useState<boolean>(false);

  const api = useApiPrivate();

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

  async function updateEvents(data: CreateEventsFormData) {
    if (!event) {
      return;
    }

    const updated = (await api.put(`/events/update/${event?.id}`, data)).data;
    const { code } = event;

    queryClient.setQueryData(["event", code], (prevData: any) => {
      return {
        ...updated,
        ...prevData,
        comments: prevData.comments ? [...prevData.comments] : [],
      };
    });

    queryClient.setQueryData(["event"], (prevData: any) => {
      return prevData?.map((item: Event) =>
        item.id === updated.id ? { ...item, ...updated } : item
      );
    });

    setEditingClient(false);
  }

  return {
    form: {
      labelFormEventsData,
      handleSubmit,
      control,
      errors,
      reset,
    },
    utils: {
      updateEvents,
      handleEditingClient,
      editingClient,
    },
    data: { event },
  };
}

export default function Edit({ event }: { event: Event | undefined }) {
  const {
    form: { handleSubmit, control, errors, reset },
    utils: { updateEvents },
  } = useFormDetails(event);

  if (!event) return;

  return (
    <form
      className="flex flex-col max-w-[30rem] w-full gap-5 px-4 rounded-md"
      onSubmit={handleSubmit(updateEvents)}
    >
      <Controller
        control={control}
        name={"name"}
        defaultValue={event["name"] || ""}
        render={({ field }) => {
          return (
            <Label.Root className="m-0">
              <input
                {...field}
                type="text"
                className={`${fontOpenSans} min-h-[3rem] bg-transparent font-semibold opacity-80 transition-[border-color] text-xl focus:border-cyan-500 px-1 outline-none border-b-[0.13rem] border-zinc-500 border-opacity-40`}
              />
              {errors?.name && errors?.name?.message}
            </Label.Root>
          );
        }}
      />
      <Controller
        control={control}
        name={"description"}
        defaultValue={event["description"] || ""}
        render={({ field }) => {
          return (
            <Label.Root className="m-0">
              <textarea
                {...field}
                placeholder="Digite uma descrição"
                className="min-h-[5rem] bg-zinc-500 bg-opacity-5 p-3 rounded resize-none h-[8rem] shadow-inner text-md p-1 outline-none"
              />
              {errors?.name && errors?.name?.message}
            </Label.Root>
          );
        }}
      />
      <div className="flex justify-between items-center gap-3">
        <Controller
          control={control}
          name={"start"}
          defaultValue={moment(event.start).format("YYYY-MM-DDTHH:mm")}
          render={({ field }) => {
            return (
              <input
                {...field}
                type="datetime-local"
                className="bg-transparent p-3 outline-none border border-zinc-500 border-opacity-10"
              />
            );
          }}
        />
        <span>Até</span>
        <Controller
          control={control}
          name={"end"}
          defaultValue={moment(event.end).format("YYYY-MM-DDTHH:mm")}
          render={({ field }) => {
            return (
              <input
                {...field}
                type="datetime-local"
                className="bg-transparent p-3 outline-none border border-zinc-500 border-opacity-10"
              />
            );
          }}
        />
      </div>
      <Controller
        control={control}
        name={"allDay"}
        defaultValue={event.allDay}
        render={({ field }) => {
          return (
            <Label.Root className="flex-col m-0 w-full gap-2">
              <Label.Title className="flex text-lg">
                O evento acontecerá todo o dia?
              </Label.Title>
              <Label.Content>
                <Button
                  type="button"
                  className={`p-3 flex w-full justify-center items-center text-white rounded ${
                    !!field.value ? "bg-cyan-500" : "bg-rose-500"
                  }`}
                  onClick={() => field.onChange(field.value ? false : true)}
                >
                  {field.value ? "Ligado" : "Desligado"}
                </Button>
              </Label.Content>
              {errors?.allDay?.message}
            </Label.Root>
          );
        }}
      />
      <Label.Root className="m-0">
        <Label.Title className="text-lg">Cor</Label.Title>
        <Label.Content className="flex-row ">
          <Controller
            control={control}
            name={"color"}
            defaultValue={event.color || "#01f9f1"}
            render={({ field }: { field: OmitAllday }) => {
              return (
                <div className="flex gap-2 items-center">
                  {colorsEvents.map((color: string) => {
                    return (
                      <button
                        onClick={() => field.onChange(color)}
                        className="rounded-md p-4"
                        style={{
                          backgroundColor: color,
                        }}
                      ></button>
                    );
                  })}
                </div>
              );
            }}
          />
        </Label.Content>
      </Label.Root>
      <div className="flex w-full gap-2 justify-between">
        <AnimatePresence>
          <motion.div
            key={"div-submit-edit"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 gap-2"
          >
            <Button
              onClick={() => reset()}
              type="button"
              className="rounded flex p-3 bg-zinc-500 bg-opacity-10"
            >
              Limpar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-45 from-purple-600 to-blue-500 px-6 rounded text-white flex justify-center p-3"
            >
              <span className="font-semibold">Salvar alterações</span>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </form>
  );
}
