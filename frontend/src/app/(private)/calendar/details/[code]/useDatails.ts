import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import { ChangeEvent, useState } from "react";
import { Event } from "@/types/events";

const useDetails = (code: string) => {
  const api = useApiPrivate();

  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const [showModalFinish, setShowModalFinish] = useState<boolean>(false);

  const handleShowModalFinish = () => setShowModalFinish((prev) => !prev);
  const handleShowModalDelete = () => setShowModalDelete((prev) => !prev);

  const { data: event, isLoading } = useQuery(["event", code], async (): Promise<Event> => {
    return (await api.get(`/events/find/${code}`)).data;
  });
  
  async function deleteEvent() {
    if(!event) return; 

    const res = await api.delete(`/events/delete/${event.id}`);

    if (!(res.statusText === "OK")) {
      return new Error("Houve um erro ao tentar excluir o item");
    }

    queryClient.setQueryData(["event", event.code], {});
    queryClient.removeQueries(["event", event.code]);
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
    }
  };
};

export default useDetails;
