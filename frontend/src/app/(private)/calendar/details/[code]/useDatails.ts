import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import { ChangeEvent, useState } from "react";
import { Event, StatusEvent } from "@/types/events";
import { toast } from "react-toastify";

const useDetails = (code: string) => {
  const api = useApiPrivate();

  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const [showModalFinish, setShowModalFinish] = useState<boolean>(false);

  const handleShowModalFinish = () => setShowModalFinish((prev) => !prev);
  const handleShowModalDelete = () => setShowModalDelete((prev) => !prev);

  const { data: event, isLoading } = useQuery(
    ["event", code],
    async (): Promise<Event> => {
      return (await api.get(`/events/find/${code}`)).data;
    }
  );

  async function deleteEvent() {
    if (!event) return;

    const res = await api.delete(`/events/delete/${event.id}`);

    if (!(res.statusText === "OK")) {
      return new Error("Houve um erro ao tentar excluir o item");
    }

    queryClient.setQueryData(["event", event.code], {});
    queryClient.removeQueries(["event", event.code]);
  }

  async function UpdateStatusEvent() {
    if (!event) return;
    const status: StatusEvent = "CONCLUDED";
    await api.patch(`/events/update-status/${event.id}`, {
      status,
    });
    queryClient.invalidateQueries(["events", code]);
  }

  return {
    query: {
      event,
      isLoading,
    },

    modalDelete: {
      handleShowModalDelete,
      showModalDelete,
    },

    events: {
      deleteEvent,
    },

    modalFinish: {
      showModalFinish,
      handleShowModalFinish,
      setShowModalFinish,
      UpdateStatusEvent,
    },
  };
};

export default useDetails;
