import useApiPrivate from "@/hooks/apiPrivate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { queryClient } from "@/hooks/queryClient";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { Event } from "../../types";
import { Clients } from "@/hooks/useClients";

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
    formState: { errors },
  } = useForm<CreateEventsFormData>({
    resolver: zodResolver(createEventsFormSchema),
  });

  const [editingClient, setEditingClient] = useState(false);

  const [showAllClients, setShowAllClients] = useState<boolean>(false);

  const handleAllClients = () => setShowAllClients((prev) => !prev);

  const [contentEventsComments, setContentEventsComments] =
    useState<string>("");

  //'ef9a432d-3c36-4f69-a145-ddf2820a218a'
  const { data: event, isLoading } = useQuery(["event", code], async () => {
    return (await api.get(`/events/find/${code}`)).data;
  });

  const { data: allClients, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return (await api.get("/clients")).data;
    },
  });

  const clients = showAllClients
    ? allClients
    : event?.clients
    ? event?.clients
    : [];

  function onChangeContentEventsComments(e: ChangeEvent<HTMLInputElement>) {
    setContentEventsComments(e.target.value.toString());
  }

  async function handleAddNewClient(id: number) {
    const clientsSelecteds = event.clients.map((client: Clients) => client.id);

    // Se o id já estiver presente, excluir
    if (clientsSelecteds.includes(id)) {
      await api.put(`/events/update/connections/${event.id}`, {
        disconnections: [id],
      });
      queryClient.invalidateQueries(["event", event.code]);
      return;
    }

    await api.put(`/events/update/connections/${event.id}`, {
      connections: [id],
    });

    queryClient.invalidateQueries(["event", event.code]);

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
      showAllClients,
      isLoadingClients,
      handleAddNewClient,
      handleAllClients,
    },
  };
};

export default useDetails;
