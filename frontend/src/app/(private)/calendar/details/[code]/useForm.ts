import { z } from "zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { Event } from "../../../../../types/events";
import { queryClient } from "@/hooks/queryClient";
import useApiPrivate from "@/hooks/apiPrivate";
import { useState } from "react";

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
  };
}
