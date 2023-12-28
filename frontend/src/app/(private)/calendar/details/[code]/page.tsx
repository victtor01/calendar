"use server"

import React from "react";
import Link from "next/link";
import useDetails from "./useDatails";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

// components
import Edit from "@/components/eventEdit";
import Comments from "@/components/eventsComments";
import ComponentClient from "@/components/eventsClients";
import ComponentService from "@/components/eventServices";
import fetchs from "@/hooks/fetch";
import { cookies } from "next/headers";

const status = {
  ACTIVATED: "ATIVADO",
  CONCLUDED: "CONCLUÍDO",
  FILED: "ARQUIVADO",
};

const statusClassName = {
  ACTIVATED: "bg-cyan-500",
  CONCLUDED: "bg-emerald-500",
  FILED: "bg-zinc-900 text-white",
};

interface DetailsProps {
  params: { code: string };
}



export default async function Details({ params: { code } }: DetailsProps) {

  const event = await fetchs(`events/find/${code}`);

  console.log(event?.id);


  /*   const router = useRouter(); */

  /*   const {
    query: { event, isLoading },
    modalDelete: { handleShowModalDelete, showModalDelete },
    modalFinish: { showModalFinish, handleShowModalFinish, UpdateStatusEvent },
    events: { deleteEvent },
  } = useDetails(code);

  if (isLoading) {
    return;
  }

  if (!event) {
    router.push("/calendar/");
    return;
  }
 */
  return (
    <main className="flex bg-transparent  relative w-full mx-auto mt-0 flex-col pb-5 gap-2 rounded-md">
      <header className="flex justify-between gap-3 rounded">
        <div className="flex flex-1">
          <Link
            href="/calendar"
            className="flex gap-3 px-3 items-center rounded-full opacity-60 hover:opacity-100 hover:bg-zinc-500 hover:bg-opacity-10"
          >
            <IoClose size="24" />
          </Link>
        </div>
      </header>
      <div className="w-full overflow-auto h-auto pt-3 gap-3 flex relative justify-between flex-wrap">
        <Edit event={event} />
        <Comments event={event} />
        <ComponentClient event={event} />
        <ComponentService event={event} />
      </div>
    </main>
  );
}
