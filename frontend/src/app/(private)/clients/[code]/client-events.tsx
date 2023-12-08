"use client";

import { Clients } from "@/types/clients";
import { Event, StatusEvent } from "@/types/events";
import * as S from "../style";
import { Service } from "@/types/services";
import moment from "moment-timezone";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import { fontInter } from "@/app/fonts";

const traductor: Record<string, string> = {
  ACTIVATED: "Ativado",
  CONCLUDED: "Concluídos",
  FILED: "Arquivados",
};

const ClientComponent = ({ event }: { event: Event }) => {
  const totalValue =
    event?.services?.reduce((acc: number, service: Service) => {
      return acc + service.price;
    }, 0) || 0;

  const { push } = useRouter();

  return (
    <S.ClientEvent className="bg-zinc-500 bg-opacity-5 p-2 flex border-b border-zinc-500 border-opacity-10 hover:shadow-lg items-center hover:z-20">
      <div className="flex flex-1 p-1">{event.name}</div>
      <div className="flex flex-1 p-1">
        {!event.allDay ? moment(event?.start).format("HH:mm") : "O dia todo!"}
      </div>
      <div className="flex flex-1 p-1">
        {moment(event.createdAt).format("DD, MMM [de] YYYY")}
      </div>
      <div className="flex p-1">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded text-white opacity-70 hover:opacity-100 bg-gradient-45 from-purple-700 to-blue-600"
          onClick={() => push(`/calendar/details/${event.code}`)}
        >
          <FaArrowRight />
        </motion.button>
      </div>
    </S.ClientEvent>
  );
};

export default function EventsClients({ client }: { client: Clients }) {
  const { events } = client;

  const groupEvents = (() => {
    const data: Record<string, Event[]> = {
      ACTIVATED: [],
      CONCLUDED: [],
      FILED: [],
    };
    events?.forEach((event: Event) => {
      data[event.status].push(event);
    });
    return data;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col w-full h-auto"
    >
      <header className="flex w-full justify-between">
        <h1 className="text-xl font-semibold flex gap-2 items-center">
          <FaCalendar />
          Eventos do cliente
        </h1>
        <span className="bg-gradient-45 rounded from-purple-700 text-white opacity-70 to-blue-600 p-2">
          {events?.length || 0} Eventos
        </span>
      </header>
      {Object.entries(groupEvents)?.map(([name, value], index: number) => {
        return (
          <div key={index} className={`mb-4 ${fontInter}`}>
            <header className="opacity-70">{traductor[name]}</header>
            <S.ClientEventComponent className={`flex flex-1 flex-col mt-3`}>
              {value?.map((event: Event, index: number) => {
                return <ClientComponent key={index} event={event} />;
              })}
            </S.ClientEventComponent>
            {!value?.length && (
              <div className="bg-gradient-45 shadow-xl from-purple-700 to-blue-600 p-4 opacity-60 rounded-md">
                <span className="text-white">Nenhum Evento</span>
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
