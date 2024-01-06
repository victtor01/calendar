import { Event } from "@/types/events";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

import Modal from "../modal";
import { queryClient } from "@/hooks/queryClient";
import { toast } from "react-toastify";
import useApiPrivate from "@/hooks/apiPrivate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Button } from "@nextui-org/react";

function useDelete({ event }: { event: Event }) {
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const handleShowModalDelete = () =>
    setShowModalDelete((prev: boolean) => !prev);

  const api = useApiPrivate();
  const router = useRouter();

  async function deleteEvent() {
    if (!event) return;

    const res = await api.delete(`/events/delete/${event.id}`);

    if (!(res.statusText === "OK")) {
      return new Error("Houve um erro ao tentar excluir o item");
    }

    queryClient.removeQueries(["event", event.code]);

    toast.warning("Evento excluído com sucesso! Você será redirecionado.");

    router.push("/calendar");
  }

  return {
    showModalDelete,
    handleShowModalDelete,
    deleteEvent,
  };
}

export function Delete({ event }: { event: Event }) {
  const { showModalDelete, handleShowModalDelete, deleteEvent } = useDelete({
    event,
  });

  return (
    <>
      <Button
        onClick={handleShowModalDelete}
        className="flex opacity-60 hover:bg-zinc-500  hover:bg-opacity-20 items-center justify-center rounded-full w-10 h-10"
      >
        <FiTrash size="20" />
      </Button>
      {showModalDelete && (
        <Modal className="gap-7 flex flex-col max-w-[30rem] p-5">
          <header className="w-full flex items-center  justify-between gap-3">
            <h1 className="text-lg font-semibold">
              Deletar o evento {event?.name}?
            </h1>
            <div className="flex">
              <button onClick={handleShowModalDelete}>
                <IoClose size="24" />
              </button>
            </div>
          </header>
          <section className="flex text-justify  text-lg flex-col gap-1">
            <p>Você tem certeza que deseja excluir esse evento?</p>
            <p>Não haverá como recupera-lo depois!</p>
          </section>
          <footer className="flex justify-between">
            <motion.button className="bg-blue-500 p-2 rounded hover:opacity-100 opacity-90">
              Cancelar
            </motion.button>
            <motion.button
              onClick={deleteEvent}
              className="bg-rose-600 p-2 rounded hover:opacity-100 opacity-90"
            >
              Tenho certeza!
            </motion.button>
          </footer>
        </Modal>
      )}
    </>
  );
}
