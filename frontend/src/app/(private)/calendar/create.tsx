"use client";

import Modal from "@/components/modal";
import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

interface AddClientProps {
  setSelectedDay: Dispatch<
    SetStateAction<{
      start: Date;
      end: Date;
    } | null>
  >;
}

function useAddEvent() {
  /* async function addEvent(data: createEvent) {
    const templete = eventsTemplates.filter(
      (even: EventsTemplates) =>
        even.id.toString() === data.draggedEl.id.toString()
    )[0];

    if (!templete) {
      return;
    }

    const res = api.post("/events/create", {
      name: data.draggedEl.innerText,
      description: "",
      allDay: data.allDay,
      start: data.date.toISOString(),
      end: data.date.toISOString(),
    });

    await toast.promise(res, {
      pending: "Salvando alterações",
      success: "Salvo com sucesso!",
      error: "Houve um erro! Tente novamente mais tarde! ",
    });

    queryClient.invalidateQueries(["events"]);
    queryClient.invalidateQueries(["events", "events-week"]);
  } */
}

export default function AddClient({ setSelectedDay }: AddClientProps) {
  return (
    <Modal>
      <header className="flex items-center justify-between border-b py-2 border-zinc-200 dark:border-zinc-700">
        <div className="font-semibold">Criar novo evento</div>
        <div className="flex">
          <button onClick={() => setSelectedDay(null)}>
            <IoClose size="22" />
          </button>
        </div>
      </header>
      <section></section>
    </Modal>
  );
}
