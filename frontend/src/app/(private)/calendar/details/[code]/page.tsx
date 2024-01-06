"use client";
import React from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

// components
import Edit from "@/components/eventEdit";
import Comments from "@/components/eventsComments";
import ComponentClient from "@/components/eventsClients";
import ComponentService from "@/components/eventServices";
import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "@/hooks/apiPrivate";
import { EventHeader } from "@/components/eventHeader";
import { Event } from "@/types/events";

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

export default function Details({ params: { code } }: DetailsProps) {
  const api = useApiPrivate();
  const { data: event, isLoading } = useQuery(
    ["event", code],
    async (): Promise<Event> => {
      return (await api.get(`/events/find/${code}`)).data;
    }
  );

  if (isLoading) return;

  if (!event) {
    return (
      <div className="p-10 font-semibold opacity-60 flex gap-3 items-center ">
        Nenhum evento,
        <Link href={"/calendar/"} className="bg-purple-600 p-2 rounded text-white">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <main className="flex bg-transparent  relative w-full mx-auto mt-0 flex-col pb-5 gap-2 rounded-md">
      <header className="flex justify-between gap-3 rounded items-center">
        <div className="flex flex-1">
          <Link
            href="/calendar"
            className="flex gap-3 px-3 items-center rounded-full opacity-60 hover:opacity-100 hover:bg-zinc-500 hover:bg-opacity-10"
          >
            <IoClose size="24" />
          </Link>
        </div>

        <div className="flex absolute top-[50%] bg-red-200">
          {status[event.status]}
        </div>

        <EventHeader event={event} />
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
