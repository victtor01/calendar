"use client";

import { fontInter } from "@/app/fonts";
import { Event, StatusEvent } from "@/types/events";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import * as S from "./style";

import moment from "moment-timezone";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface ClientComponentProps {
  itemSelected: Event;
  setIdSelected: Dispatch<SetStateAction<number | null>>;
}

const StatusPT: Record<StatusEvent, string> = {
  ACTIVATED: "Ativado!",
  CONCLUDED: "Concluído!",
  FILED: "Arquivado!",
};

export function ClientComponent({
  itemSelected,
  setIdSelected,
}: ClientComponentProps) {
  const status = ((): string => {
    const currentStatus = itemSelected.status;
    const startMoment = moment(itemSelected.start);

    if (currentStatus !== "ACTIVATED") return StatusPT[currentStatus];

    if (startMoment.isAfter(moment())) {
      return "O evento ainda vai acontecer!";
    }

    return "Evento atrasado!";
  })();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={itemSelected.id}
      style={{ zIndex: 100 }}
      className="fixed top-0 left-0 w-full  h-screen bg-zinc-900 bg-opacity-10 z-[100] backdrop-blur-md flex justify-center items-center"
    >
      <S.Modal
        className="bg-zinc-800 flex flex-col shadow-xl rounded-md w-[30rem] relative z-[100]"
        layoutId={"filter"}
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: -40 }}
        transition={{ type: "spring" }}
      >
        <S.Bubble />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex p-3 rounded-md  absolute z-[30] top-0 right-0 absolute translate-x-[50%] translate-y-[-50%]"
        >
          <button
            className="bg-gradient-45 from-purple-500 opacity-90 hover:opacity-100 shadow-lg to-emerald-500 p-2 rounded-full flex w-auto"
            onClick={() => setIdSelected(null)}
          >
            <IoClose size="24" />
          </button>
        </motion.div>
        <section className="flex p-3 flex-1 flex-col">
          <div className={`py-3 opacity-80 ${fontInter}`}>
            <h1 className="text-2xl font-semibold">{itemSelected?.name}</h1>
          </div>
          <div className="p-2 bg-zinc-500 bg-opacity-10 rounded-md shadow-inner">
            <span className="font-semibold opacity-90">
              {itemSelected?.description || "Nenhuma descrição"}
            </span>
          </div>
          <div className="p-2 flex justify-between ">
            {itemSelected?.allDay ? (
              <div className="flex justify-between flex-1 gap-1">
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold opacity-60">Começa em:</h3>
                  <span className="font-semibold text-lg">
                    dia {moment(itemSelected.start).format("DD (dddd)")}
                  </span>
                </div>
                <div className="flex flex-col flex-1 items-end">
                  <h3 className="font-semibold opacity-60">Termina em:</h3>
                  <span className="font-semibold text-lg">
                    dia {moment(itemSelected.end).format("DD (dddd)")}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <h2>Começa em:</h2>
                  <span>
                    {moment(itemSelected?.start).format(
                      "ddd, MM [de] YYYY [às] HH:mm"
                    )}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h2>Termina em:</h2>
                  <span>
                    {moment(itemSelected?.end).format(
                      "ddd, MM [de] YYYY [às] HH:mm"
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="p-2 font-semibold flex text-lg">
            {itemSelected.clients?.length || "0"} Clientes
          </div>
          <div className="p-2 flex justify-between ">
            <div className="flex flex-col flex-1">
              <h3 className="font-semibold opacity-60">Status:</h3>
              <span className="font-semibold text-lg">{status}</span>
            </div>
          </div>
        </section>
        <footer className="flex w-full p-3">
          <Link
            href={`/calendar/details/${itemSelected.code}/`}
            className="bg-gradient-45 from-purple-600 to-blue-500 p-2 rounded px-3 text-white opacity-90 hover:opacity-100"
          >
            Mais detalhes
          </Link>
        </footer>
      </S.Modal>
    </motion.div>
  );
}
