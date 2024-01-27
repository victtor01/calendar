"use client";

import { Button, colors } from "@nextui-org/react";
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
import { toast } from "react-toastify";
import Spinner from "@/components/spinner";

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
    templates: z
      .array(
        z.object({
          id: z.number(),
          color: z.string().nullable(),
          name: z.string(),
        })
      )
      .nullable(),
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
    formState: { errors, isSubmitting },
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

    try {
      const updated = (await api.put(`/events/update/${event?.id}`, data)).data;
      const { code } = event;

      const updateQueryDataPromises = [
        queryClient.setQueryData(
          ["event", code],
          (prevData: Event | undefined) => {
            return {
              ...updated,
              services: prevData?.services ? [...prevData.services] : [],
              comments: prevData?.comments ? [...prevData.comments] : [],
              template: updated?.templates ? [...updated.templates] : [],
            };
          }
        ),
        queryClient.setQueryData(["events"], (prevData: any) => {
          return prevData?.map((event: Event) =>
            event.id === updated.id
              ? {
                  ...updated,
                  services: prevData?.services ? [...prevData.services] : [],
                  comments: prevData?.comments ? [...prevData.comments] : [],
                  template: updated?.templates ? [...updated.templates] : [],
                }
              : event
          );
        }),
      ];

      await Promise.all(updateQueryDataPromises);

      toast.success("Atualizado com sucesso!");
    } catch (error) {
      toast.error("Houve um erro, tente novamente mais tarde!");
    }
  }

  return {
    form: {
      handleSubmit,
      isSubmitting,
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
    form: { handleSubmit, control, isSubmitting, errors, reset },
    utils: { updateEvents, openTemplates, handleOpenTemplates, append, remove },
    data: { templates },
  } = useFormDetails(event);

  if (!event) {
    return;
  }

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
                className={`${fontOpenSans} bg-transparent font-semibold opacity-80 transition-[border-color] text-xl outline-none`}
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
                className="min-h-[5rem] bg-zinc-500 bg-opacity-5  rounded resize-none h-[8rem] shadow-inner text-md p-1 outline-none"
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
                <button
                  style={{
                    justifyContent: field.value ? "flex-end" : "flex-start",
                  }}
                  type="button"
                  className="bg-zinc-200 dark:bg-zinc-800 overflow-hidden w-16 h-8 p-[1px] flex border-2 border-zinc-100 dark:border-zinc-800 rounded-full shadow-inner"
                  onClick={() => {
                    field.onChange(field.value ? false : true);
                  }}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`w-7 h-full rounded-full flex transition-background ${
                      field?.value
                        ? " bg-cyan-500 shadow-cyan-400 shadow-lg"
                        : "bg-zinc-600 dark:bg-zinc-700"
                    }`}
                  />
                </button>
              </Label.Content>
              {errors?.allDay?.message}
            </Label.Root>
          );
        }}
      />

      <Label.Root className="mt-0">
        <Label.Title>Templates</Label.Title>
        <div className="relative flex gap-3">
          <Controller
            control={control}
            defaultValue={event.templates || []}
            name="templates"
            render={({ field }) => (
              <>
                <div className="bg-zinc-100 dark:bg-zinc-800 flex-1 p-3 gap-1 flex-wrap flex w-full rounded">
                  {field?.value?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="bg-zinc-200 items-center gap-2 flex dark:bg-zinc-700 p-1 px-2 font-semibold rounded"
                    >
                      {item?.color && (
                        <span
                          className="w-3 h-3 rounded"
                          style={{ background: item.color }}
                        />
                      )}
                      {item.name}
                      <button
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <IoClose size="18" />
                      </button>
                    </div>
                  ))}
                  {!field?.value?.length && <span>Nenhum selecionado</span>}
                </div>
                <button
                  type="button"
                  onClick={handleOpenTemplates}
                  className="text-cyan-500 font-semibold"
                >
                  {openTemplates ? "Fechar" : "Abrir"}
                </button>
                <AnimatePresence>
                  {openTemplates && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      key={"modal-template"}
                      className="absolute w-full flex flex-wrap z-[30] gap-1 h-[5rem] overflow-auto top-[100%] p-2 rounded mt-2 bg-zinc-200 dark:bg-zinc-800"
                    >
                      {templates?.map(
                        (template: EventsTemplates, index: number) => {
                          return (
                            <motion.button
                              type="button"
                              onClick={() => {
                                if (
                                  !field?.value?.some(
                                    (item) => item.id === template.id
                                  )
                                ) {
                                  append({
                                    id: template.id,
                                    color: template.color || "",
                                    name: template.name,
                                  });
                                }
                              }}
                              key={index}
                              className="flex items-center bg-zinc-100 dark:bg-zinc-700 gap-3 p-1 px-3 rounded hover:bg-zinc-500 bg-opacity-10"
                            >
                              <span
                                className="p-1 w-3 h-3 rounded"
                                style={{
                                  background: template.color || "transparent",
                                }}
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
            defaultValue={event.color}
            render={({ field }: { field: OmitAllday }) => {
              return (
                <div className="flex gap-2 items-center">
                  {colorsEvents.map((color: string, index: number) => {
                    return (
                      <button
                        key={index}
                        type="button"
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
              className="bg-gradient-45 from-purple-600 to-blue-500 px-6 rounded text-white flex justify-center p-5 w-full max-w-[10rem]"
            >
              <span className="font-semibold">
                {isSubmitting ? (
                  <Spinner className="w-5 h-5" />
                ) : (
                  "Salvar Alterações"
                )}
              </span>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </form>
  );
}
