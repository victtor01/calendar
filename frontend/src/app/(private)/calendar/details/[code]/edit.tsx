"use client";

import { BsFillPersonLinesFill, BsPenFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import { AiOutlineClose } from "react-icons/ai";
import Label from "@/components/label";
import { Controller } from "react-hook-form";
import { fontRoboto } from "@/app/fonts";
import { z } from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { queryClient } from "@/hooks/queryClient";
import useApiPrivate from "@/hooks/apiPrivate";
import { useState } from "react";
import { Event } from "@/types/events";
import { AnimatePresence, motion } from "framer-motion";

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

export function useFormDetails(event: Event) {
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
    const updated = (await api.put(`/events/update/${event.id}`, data)).data;
    const { code } = event;
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

const ContentEditingClient = () => (
  <>
    <BsPenFill size="12" />
    Editar
  </>
);

const ContentNotEditingClient = () => (
  <>
    <AiOutlineClose size="12" />
    Cancelar
  </>
);

export default function Edit({ event }: { event: Event | undefined }) {

  if(!event) return; 

  const {
    form: { labelFormEventsData, handleSubmit, control, errors, reset },
    utils: { updateEvents, handleEditingClient, editingClient },
  } = useFormDetails(event);

  return (
    <form
      className="flex flex-col max-w-[25rem] w-full gap-2 mx-auto items-center"
      onSubmit={handleSubmit(updateEvents)}
    >
      <div
        className={`rounded justify-between opacity-70 w-full h-10 flex items-center gap-3 ${fontRoboto}`}
      >
        <h1 className="text-xl flex gap-3 items-center">
          <BsFillPersonLinesFill size="18" />
          Informações
        </h1>
        <Button
          type="button"
          onClick={handleEditingClient}
          className={`items-center gap-2 rounded text-white from-cyan-500 to-blue-500 tex-tg flex p-2 px-3 ${
            editingClient ? "bg-red-600" : "bg-gradient-to-r"
          }`}
        >
          {!editingClient ? (
            <ContentEditingClient />
          ) : (
            <ContentNotEditingClient />
          )}
        </Button>
      </div>
      {labelFormEventsData.map(
        (label: LabelFormEventsDataProps, index: number) => {
          return (
            <Controller
              control={control}
              key={index}
              name={label.name as KeyOfEventsFormData}
              defaultValue={String(
                label.default || event[label.name as keyof Event]
              )}
              render={({ field }: { field: OmitAllday }) => {
                return (
                  <Label.Root className="m-0">
                    <Label.Title className="text-lg">{label.span}</Label.Title>
                    <input
                      {...field}
                      disabled={!editingClient}
                      type={label?.type || "text"}
                      className="min-h-[3rem] bg-transparent focus:border-cyan-500 p-3 outline-none rounded border border-zinc-500 border-opacity-40"
                    />
                    {errors &&
                      errors[label.name as KeyOfEventsFormData]?.message}
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
            <Label.Root className="flex-col m-0 w-full gap-2">
              <Label.Title className="flex text-lg">
                O evento acontecerá todo o dia?
              </Label.Title>
              <Label.Content>
                <Button
                  type="button"
                  disabled={!editingClient}
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
                <>
                  <input
                    {...field}
                    disabled={!editingClient}
                    type="color"
                    className="bg-zinc-200 h-[3rem] rounded flex p-1"
                  />
                  <div
                    style={{
                      background: field.value || event.color || "#01f9f1",
                    }}
                    className="opacity-80 text-shadow shadow-lg flex flex-1 items-center px-3 rounded h-full text-white"
                  >
                    Conteúdo de exemplo
                  </div>
                </>
              );
            }}
          />
        </Label.Content>
      </Label.Root>
      <div className="flex w-full gap-2 justify-between">
        <AnimatePresence>
          {editingClient && (
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
                className="rounded flex p-3 "
              >
                Limpar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded text-white flex justify-center p-3"
              >
                Salvar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
