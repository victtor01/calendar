import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import { ChangeEvent, useState } from "react";
import { Event, StatusEvent } from "@/types/events";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useDetails = (code: string) => {
  const api = useApiPrivate();
  const router = useRouter();

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

    queryClient.removeQueries(["event", event.code]);

    toast.warning('Evento excluído com sucesso! Você será redirecionado.');

    router.push('/calendar');
  }

  async function UpdateStatusEvent() {
    if (!event) return;
    const status: StatusEvent = "CONCLUDED";
    await api.patch(`/events/update-status/${event.id}`, {
      status,
    });
    queryClient.invalidateQueries(["event", code]);
    queryClient.invalidateQueries(["events"]);
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
