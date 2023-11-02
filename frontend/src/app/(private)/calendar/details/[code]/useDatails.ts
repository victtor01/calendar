import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { queryClient } from "@/hooks/queryClient";
import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { Clients } from "@/hooks/useClients";

const useDetails = (code: string) => {
  const api = useApiPrivate();
  const [showAllClients, setShowAllClients] = useState<boolean>(false);

  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const handleShowModalDelete = () => setShowModalDelete((prev) => !prev);
  const handleAllClients = () => setShowAllClients((prev) => !prev);

  const [contentEventsComments, setContentEventsComments] =
    useState<string>("");

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

  async function deleteEvent() {
    const res = await api.delete(`/events/delete/${event.id}`);

    if (!(res.statusText === "OK")) {
      return new Error("Houve um erro ao tentar excluir o item");
    }

    queryClient.setQueryData(["event", event.code], {});
    queryClient.removeQueries(["event", event.code]);
  }

  return {
    comments: {
      onChangeContentEventsComments,
      contentEventsComments,
      createEventsComments,
    },

    query: {
      event,
      isLoading,
    },

    clients: {
      clients,
      showAllClients,
      isLoadingClients,
      handleAddNewClient,
      handleAllClients,
    },

    modalDelete: {
      handleShowModalDelete,
      showModalDelete,
    },

    events: {
      deleteEvent,
    },
  };
};

export default useDetails;
