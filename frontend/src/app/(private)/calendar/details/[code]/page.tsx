"use client";
import Button from "@/components/button";
import Label from "@/components/label";
import useApiPrivate from "@/hooks/apiPrivate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CreateEventsFormData,
  KeyOfEventsFormData,
  createEventsFormSchema,
  LabelFormEventsDataProps,
  LabelFormDataEvents,
} from "./utils";
import { queryClient } from "@/hooks/queryClient";

const TextAreaComponent = forwardRef<HTMLTextAreaElement, any>((props, ref) => (
  <textarea ref={ref} {...props} />
));

const Input = forwardRef<HTMLInputElement, any>((props, ref) => (
  <input ref={ref} {...props} />
));

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

  const { data: event, isLoading } = useQuery({
    queryKey: ["event", code],
    queryFn: async () => {
      return (await api.get(`/events/find/${code}`)).data;
    },
  });

  async function updateEvents(data: CreateEventsFormData) {
    const response = await api.put(`/events/update/${event.id}`, data);
    queryClient.invalidateQueries(['events'])
    queryClient.invalidateQueries(["event", code])
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
      component: TextAreaComponent,
    },
    {
      name: "color",
      span: "Cor",
      type: "color",
      default: " ",
    },
  ] satisfies LabelFormDataEvents;

  return {
    form: { handleSubmit, control, updateEvents, reset, labelFormEventsData },
    query: { event, isLoading },
    rest: {},
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
    query: { event, isLoading },
  } = useDetails(code);

  if (isLoading) {
    return;
  }

  return (
    <div className="w-full h-full flex gap-7 mt-20 relative justify-center flex-wrap">
      <div className="flex flex-col max-w-[25rem] gap-2 w-full justify-center items-center">
        <div className="bg-cyan-400 opacity-80 p-4 rounded w-full h-auto">
          <h2 className="text-lg text-black">Meus Comentários</h2>
        </div>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(updateEvents)}
        >
          {labelFormEventsData.map(
            (
              { component: Components, ...label }: LabelFormEventsDataProps,
              index: number
            ) => {
              const Component = Components || Input;
              return (
                <Controller
                  control={control}
                  key={index}
                  name={label.name as KeyOfEventsFormData}
                  defaultValue={label.default || event[label.name]}
                  render={({ field }) => {
                    return (
                      <Label.Root className="m-0">
                        <Label.Title className="text-lg">
                          {label.span}
                        </Label.Title>
                        <Component
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
                <div className="flex w-full items-center justify-between">
                  <div className="flex text-lg">
                    O evento acontecerá todo o dia?
                  </div>
                  <Button
                    type="button"
                    className={`p-3 flex min-w-[7rem] justify-center items-center text-white rounded ${
                      !!field.value ? "bg-emerald-400" : "bg-rose-600"
                    }`}
                    onClick={() => field.onChange(field.value ? false : true)}
                  >
                    {field.value ? "Ligado" : "Desligado"}
                  </Button>
                </div>
              );
            }}
          />
          <div className="flex justify-between w-full gap-3">
            <Button
              onClick={() => reset()}
              type="button"
              className="bg-gradient-to-r rounded text-white from-cyan-500 to-blue-500 tex-tg flex p-4 "
            >
              Limpar
            </Button>
            <Button className="bg-gradient-to-r from-rose-500 to-fuchsia-600 rounded text-white tex-tg flex flex-1 justify-center p-4">
              Enviar
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col max-w-[25rem] gap-2 w-full justify-center items-center">
        <div className="bg-cyan-400 opacity-80 p-4 rounded w-full h-auto">
          <h2 className="text-lg text-black">Meus Comentários</h2>
        </div>
        <div className="flex flex-1 bg-zinc-400 bg-opacity-10 w-full rounded"></div>
      </div>
    </div>
  );
}
