"use client";

import Modal from "@/components/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment-timezone";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "@/components/loading";
import { EventsTemplates } from "@/types/eventsTemplates";
import { colorsEvents } from "@/constants/colorsEvents";
import { BiCheck } from "react-icons/bi";
import { z } from "zod";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import useTemplates from "@/hooks/templates";

const maxLenghtDescriptionInput = 100;

type CreateEventsFormData = z.infer<typeof createEventsFormSchema>;

interface AddClientProps {
  setSelectedDay: Dispatch<
    SetStateAction<{
      start: Date;
      end: Date;
    } | null>
  >;
  selectedDay: {
    start: Date;
    end: Date;
  };
}

const createEventsFormSchema = z
  .object({
    name: z.string().nonempty("Preencha o nome!"),
    allDay: z.boolean(),
    description: z
      .string()
      .max(maxLenghtDescriptionInput, "Número máximos de caractéres!")
      .nullable(),
    color: z.string().nullable(),
    start: z.string().nonempty().nonempty("Escolha uma data de começo!"),
    end: z.string().nonempty("Escolha uma data de termino!"),
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

function useAddEvent() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventsFormData>({
    resolver: zodResolver(createEventsFormSchema),
  });

  const api = useApiPrivate();

  const { append: addTemplate, remove: removeTemplate } = useFieldArray({
    control,
    name: "templates",
  });
  const { data: templates, isLoading } = useTemplates().useGetAll();

  const [openModalTemplates, setOpenModalTemplates] = useState<boolean>(false);

  async function addEvent(data: CreateEventsFormData) {
    const { start, end, ...rest } = data;

    const res = await api.post("/events/create", {
      ...rest,
      start: new Date(data.start),
      end: new Date(data.end),
    });

    /*   await toast.promise(res, {
      pending: "Salvando alterações",
      success: "Salvo com sucesso!",
      error: "Houve um erro! Tente novamente mais tarde! ",
    }); */

    await queryClient.invalidateQueries(["events"]);
    await queryClient.invalidateQueries(["events", "events-week"]);
  }

  return {
    form: {
      control,
      register,
      handleSubmit,
      addEvent,
      errors,
      templates: {
        addTemplate,
        removeTemplate,
      },
    },
    templates: {
      isLoading,
      templates,
    },
    modals: {
      setOpenModalTemplates,
      openModalTemplates,
    },
  };
}

export default function AddClient(props: AddClientProps) {
  const {
    selectedDay: { start, end },
    setSelectedDay,
  } = props;

  const {
    form: {
      templates: { addTemplate, removeTemplate },
      handleSubmit,
      addEvent,
      errors,
      control,
      register,
    },
    templates: { isLoading, templates },

    modals: { setOpenModalTemplates, openModalTemplates },
  } = useAddEvent();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center fixed w-full h-screen">
        <Loading className="bg-cyan-600" />
      </div>
    );
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit(addEvent)}>
        <header className="flex items-center justify-between p-2">
          <div className="font-semibold capitalize text-lg">
            Criar novo evento
          </div>
          <div className="flex">
            <button type="button" onClick={() => setSelectedDay(null)}>
              <IoClose size="22" />
            </button>
          </div>
        </header>
        <section className="flex flex-col gap-3">
          <input
            {...register("name")}
            autoComplete="off"
            placeholder="Digite o nome do evento..."
            className="bg-transparent outline-none p-1 text-xl placeholder:text-lg font-semibold"
          />
          {errors?.name && (
            <span className="font-semibold opacity-80 text-red-600">
              {errors?.name?.message}
            </span>
          )}

          <Controller
            control={control}
            defaultValue=""
            name="description"
            render={({ field }) => (
              <div className="flex relative w-full">
                <textarea
                  {...field}
                  maxLength={maxLenghtDescriptionInput}
                  value={field.value || ""}
                  placeholder="Digite uma descrição..."
                  className="p-2 bg-zinc-400 bg-opacity-10 flex-1 dark:bg-zinc-800 shadow resize-none h-[7rem] outline-none font-semibold text-zinc-700 dark:text-zinc-300 rounded transition-shadow focus:shadow-lg"
                />
                <span className="absolute z-10 right-2 top-2 font-semibold">
                  {maxLenghtDescriptionInput - (field.value?.length || 0)}
                </span>
              </div>
            )}
          />
          {errors?.description && (
            <span className="font-semibold opacity-80 text-red-600">
              {errors?.description?.message}
            </span>
          )}

          <div className="flex gap-3 items-center">
            <div>
              <Controller
                control={control}
                name="start"
                defaultValue={moment(start).format("YYYY-MM-DDTHH:mm")}
                render={({ field }) => (
                  <input
                    disabled
                    className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 outline-none"
                    type="datetime-local"
                    {...field}
                  />
                )}
              />
              {errors?.start && (
                <span className="font-semibold opacity-80 text-red-600">
                  {errors?.start?.message}
                </span>
              )}
            </div>
            <span className="font-semibold opacity-70">ATÉ</span>
            <div>
              <Controller
                control={control}
                name="end"
                defaultValue={moment(end).format("YYYY-MM-DDTHH:mm")}
                render={({ field }) => (
                  <input
                    disabled
                    className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 outline-none"
                    type="datetime-local"
                    {...field}
                  />
                )}
              />
              {errors?.end && (
                <span className="font-semibold opacity-80 text-red-600">
                  {errors?.end?.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <span className="font-semibold opacity-60">
              O evento acontecerá o dia todo?
            </span>
            <Controller
              name="allDay"
              control={control}
              defaultValue={true}
              render={({ field }) => (
                <button
                  style={{
                    justifyContent: field.value ? "flex-end" : "flex-start",
                  }}
                  type="button"
                  className="bg-zinc-100 dark:bg-zinc-800 w-16 h-8 p-[1px] flex border-2 border-zinc-100 dark:border-zinc-800 rounded-full shadow-inner"
                  onClick={() => {
                    field.onChange(field.value ? false : true);
                  }}
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`w-7 h-full rounded-full flex transition-background ${
                      field?.value
                        ? " bg-cyan-500"
                        : "bg-zinc-600 dark:bg-zinc-700"
                    }`}
                  />
                </button>
              )}
            />
          </div>

          <div className="flex gap-1 justify-center flex-col">
            <div className="flex gap-3 items-center">
              <span className="font-semibold opacity-60">Escolha uma cor:</span>
              <Controller
                control={control}
                name={"color"}
                defaultValue={""}
                render={({ field }) => {
                  return (
                    <div className="flex gap-2 items-center">
                      {colorsEvents.map((color: string, index: number) => {
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => field.onChange(color)}
                            className="rounded-full p-2 w-8 h-8 flex justify-center items-center text-white"
                            style={{
                              opacity: field.value == color ? 1 : 0.8,
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
            </div>
            {errors?.color && (
              <span className="font-semibold opacity-80 text-red-600">
                {errors?.color?.message}
              </span>
            )}
          </div>

          <Controller
            control={control}
            name="templates"
            render={({ field }) => (
              <div className="flex flex-col relative">
                <div className="flex gap-2">
                  <div className="flex max-w-[20rem] flex-1 flex-wrap gap-2 p-3 bg-zinc-100  dark:bg-zinc-800 min-h-[2rem] rounded">
                    <AnimatePresence mode="popLayout">
                      {field?.value?.map((template, index: number) => (
                        <motion.div
                          layout
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "linear" }}
                          key={template.id}
                          className="flex font-semibold whitespace-nowrap items-center gap-1 bg-zinc-200 dark:bg-zinc-700 p-1 px-2 rounded"
                        >
                          {template?.color && (
                            <span
                              style={{ backgroundColor: template.color }}
                              className="w-3 h-3 rounded"
                            />
                          )}
                          {template.name}
                          <button
                            type="button"
                            onClick={() => {
                              removeTemplate(index);
                            }}
                          >
                            <IoClose />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenModalTemplates((prev) => !prev)}
                    className="p-2 font-semibold text-cyan-600"
                  >
                    {openModalTemplates ? "Fechar" : "Abrir"}
                  </button>
                </div>
                <AnimatePresence>
                  {openModalTemplates && (
                    <motion.div
                      key={"modal-template"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex p-2 flex-wrap gap-2 z-20 absolute top-[100%] shadow bg-zinc-100 dark:bg-zinc-800 mt-2 w-full max-w-[20rem] h-auto overflow-y-auto rounded"
                    >
                      {templates?.map(
                        (template: EventsTemplates, index: number) => (
                          <button
                            type="button"
                            onClick={() => {
                              const includes = field?.value?.some(
                                (item) => item.id === template.id
                              );
                              if (!includes) {
                                addTemplate({
                                  id: template.id,
                                  name: template.name,
                                  color: template.color,
                                });
                              }
                            }}
                            key={index}
                            className="bg-zinc-100 font-semibold flex dark:bg-zinc-700 hover:bg-zinc-200 hover:dark:bg-zinc-600 p-1 items-center gap-2 rounded px-2"
                          >
                            {template?.color && (
                              <span
                                style={{ backgroundColor: template.color }}
                                className="w-3 h-3 rounded"
                              />
                            )}
                            {template.name}
                          </button>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          />
        </section>
        <footer className="border-t py-2 border-zinc-200 dark:border-zinc-700  mt-2">
          <button
            className="p-2 px-3 opacity-90 hover:opacity-100 rounded bg-gradient-45 from-purple-600 to-blue-600 "
            onClick={() => {
              setSelectedDay(null);
            }}
            type="submit"
          >
            <span className="font-semibold text-lg text-white">Pronto!</span>
          </button>
        </footer>
      </form>
    </Modal>
  );
}
