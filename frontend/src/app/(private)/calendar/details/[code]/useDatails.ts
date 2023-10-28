import useApiPrivate from "@/hooks/apiPrivate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { queryClient } from "@/hooks/queryClient";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { Event } from "../../types";

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

const useDetails = (code: string) => {
  const api = useApiPrivate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm<CreateEventsFormData>({
    resolver: zodResolver(createEventsFormSchema),
  });

  const [editingClient, setEditingClient] = useState(false);

  const [contentEventsComments, setContentEventsComments] =
    useState<string>("");

  const [clientesSelecteds, setClientesSelectds] = useState<number[]>([]);

  //'ef9a432d-3c36-4f69-a145-ddf2820a218a'
  const { data: event, isLoading } = useQuery(["event", code], async () => {
    return (await api.get(`/events/find/${code}`)).data;
  });

  const { data: clients, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return (await api.get("/clients")).data;
    },
  });

  function onChangeContentEventsComments(e: ChangeEvent<HTMLInputElement>) {
    setContentEventsComments(e.target.value.toString());
  }

  function handleAddNewClient(id: number) {
    if (clientesSelecteds.includes(id)) {
      setClientesSelectds((prev: number[]) => {
        return prev?.filter((item) => item !== id);
      });
      return;
    }
    setClientesSelectds((prev) => [...prev, id]);
  }

  const handleEditingClient = () => setEditingClient((prev) => !prev);

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
    
    setEditingClient(false);
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
      labelFormEventsData,
      handleSubmit,
      updateEvents,
      control,
      errors,
      reset,
    },
    comments: {
      onChangeContentEventsComments,
      contentEventsComments,
      createEventsComments,
    },
    query: {
      event,
      isLoading,
    },
    edit: {
      handleEditingClient,
      editingClient,
    },
    clients: {
      clients,
      isLoadingClients,
      handleAddNewClient,
      clientesSelecteds,
    },
  };
};

export default useDetails;
