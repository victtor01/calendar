"use client";

import { Button } from "@nextui-org/react";
import Label from "@/components/label";
import { Controller, useFieldArray } from "react-hook-form";
import { fontOpenSans } from "@/app/fonts";
import { z } from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { queryClient } from "@/hooks/queryClient";
import useApiPrivate from "@/hooks/apiPrivate";
import { Event } from "@/types/events";
import { AnimatePresence, motion } from "framer-motion";
import { colorsEvents } from "@/constants/colorsEvents";
import { BiCheck } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { EventsTemplates } from "@/types/eventsTemplates";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export type CreateEventsFormData = z.infer<typeof createEventsFormSchema>;
export type KeyOfEventsFormData = keyof CreateEventsFormData;
export type OmitAllday = Omit<ControllerRenderProps, "allDay">;

const createEventsFormSchema = z
  .object({
    name: z.string().nonempty("Preencha o nome!"),
    allDay: z.boolean(),
    description: z.string(),
    start: z.string(),
    color: z.string(),
    end: z.string(),
    templates: z.array(
      z.object({
        id: z.number(),
        color: z.string(),
        name: z.string(),
      })
    ),
  })
  .refine(
    (data: any) => {
      if (new Date(data.end) < new Date(data.start)) {
        return false;
      }

      return true;
    },
    {
      message: "A data de término deve ser posterior à data de início.",
    }
  );

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

  const [openTemplates, setOpenTemplates] = useState<boolean>(false);
  const handleOpenTemplates = () => setOpenTemplates((prev) => !prev);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "templates",
  });

  const api = useApiPrivate();

  const { data: templates } = useQuery({
    queryKey: ["events-templates"],
    queryFn: async () => {
      return (await api.get("/events-templates")).data;
    },
  });

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

    queryClient.setQueryData(["events"], (prevData: any) => {
      return prevData?.map((item: Event) =>
        item.id === updated.id ? { ...item, ...updated } : item
      );
    });
  }

  return {
    form: {
      handleSubmit,
      control,
      errors,
      reset,
    },
    utils: {
      updateEvents,
      handleOpenTemplates,
      openTemplates,
      fields,
      append,
      remove,
    },
    data: {
      templates,
    },
  };
}

export default function Edit({ event }: { event: Event | undefined }) {
  const {
    form: { handleSubmit, control, errors, reset },
    utils: { updateEvents, openTemplates, handleOpenTemplates, append, remove },
    data: { templates },
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
                placeholder="Digite uma descrição..."
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
        {errors?.end && errors?.end?.message}
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

      <Label.Root>
        <Label.Title>Templates</Label.Title>
        <div className="relative flex gap-3">
          <Controller
            control={control}
            name="templates"
            render={({ field }) => (
              <>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-zinc-800 flex-1 p-3 gap-3 flex-wrap flex w-full rounded"
                >
                  {field?.value?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="bg-zinc-200 items-center gap-2 flex bg-zinc-700 p-1 px-2 font-semibold rounded"
                    >
                      {item?.color && (
                        <span
                          className="w-3 h-3 rounded"
                          style={{ background: item.color }}
                        />
                      )}
                      {item.name}
                      <button
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <IoClose size="18" />
                      </button>
                    </div>
                  ))}

                  {!field?.value?.length && <span>Nenhum selecionado</span>}
                </motion.button>
                <button
                  onClick={handleOpenTemplates}
                  className="text-cyan-500 font-semibold"
                >
                  ABRIR
                </button>
                <AnimatePresence>
                  {openTemplates && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      key={"modal-template"}
                      className="absolute w-full z-[30] p-0 rounded-md h-[5rem] overflow-auto top-[100%] p-2 rounded mt-2 bg-zinc-200 dark:bg-zinc-800"
                    >
                      {templates?.map(
                        (template: EventsTemplates, index: number) => {
                          return (
                            <motion.button
                              onClick={() => {
                                append({
                                  id: template.id,
                                  color: template.color || "",
                                  name: template.name,
                                });
                              }}
                              key={index}
                              className="flex items-center w-full gap-3 p-1 px-3 rounded hover:bg-zinc-500 bg-opacity-10"
                            >
                              <span
                                className="p-1 w-3 h-3 rounded"
                                style={{ background: template.color }}
                              />
                              <div className="">{template.name}</div>
                            </motion.button>
                          );
                        }
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          />
        </div>
      </Label.Root>

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
                  {colorsEvents.map((color: string, index: number) => {
                    return (
                      <button
                        key={index}
                        onClick={() => field.onChange(color)}
                        className="rounded-md p-2 w-10 h-10 flex justify-center items-center"
                        style={{
                          backgroundColor: color,
                        }}
                      >
                        {field?.value === color && <BiCheck />}
                      </button>
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
