"use client";

import { fontInter, fontValela } from "@/app/fonts";
import { Event, StatusEvent } from "@/types/events";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import * as S from "./style";
import moment from "moment-timezone";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaList,
  FaPen,
} from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { TfiTime } from "react-icons/tfi";
import { BiSolidTime } from "react-icons/bi";
import { BsJustifyLeft, BsListNested } from "react-icons/bs";

interface ClientComponentProps {
  itemSelected: Event;
  setIdSelected: Dispatch<SetStateAction<number | null>>;
}

const StatusPT: Record<StatusEvent, string> = {
  ACTIVATED: "Ativado!",
  CONCLUDED: "Concluído!",
  FILED: "Arquivado!",
};

function useClientComponent() {
  const [indicator, setIndicator] = useState<any>(null);

  function moveIndicator(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    const target = event.currentTarget;

    const componentRect = target.getBoundingClientRect();
    const offsetParentRect = target.offsetParent?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    const leftRelativeToParent = componentRect.left - offsetParentRect.left;

    setIndicator({
      width: target.offsetWidth,
      left: leftRelativeToParent,
    });
  }

  return {
    refs: {
      indicator,
    },
    utils: {
      moveIndicator,
    },
  };
}

export function ClientComponent({
  itemSelected,
  setIdSelected,
}: ClientComponentProps) {
  const {
    refs: { indicator },
    utils: { moveIndicator },
  } = useClientComponent();

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
      className="fixed top-0 left-0 w-full h-screen bg-zinc-900 bg-opacity-10 z-[100] backdrop-blur-md p-4 flex justify-center overflow-y-auto"
    >
      <S.Modal
        className="bg-zinc-800 flex flex-col shadow-xl rounded-md max-w-[55rem] h-auto w-full relative z-[100] my-auto"
        layoutId={"filter"}
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: -40 }}
        transition={{ type: "spring" }}
      >
        <header className="flex p-2 border-b border-zinc-500 items-center border-opacity-20 justify-between">
          <div className="text-lg opacity-80">
            <h1 className={`${fontValela} opacity-80`}>Detalhes do evento</h1>
          </div>
          <div className="flex gap-2">
            <button className="opacity-80 hover:opacity-100 rounded-full p-3 hover:bg-zinc-400 hover:bg-opacity-10">
              <FaPen />
            </button>
            <button className="opacity-80 hover:opacity-100 rounded-full p-3 hover:bg-zinc-400 hover:bg-opacity-10">
              <FiTrash size="18" />
            </button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-full hover:bg-zinc-500 hover:bg-opacity-20 opacity-80 hover:opacity-100  p-2 rounded flex w-auto"
              onClick={() => setIdSelected(null)}
            >
              <IoClose size="24" />
            </motion.button>
          </div>
        </header>
        <S.Bubble />
        <section className="flex p-3 flex-1 flex-col">
          <header className="flex flex-1">
            <div className="flex mx-auto gap-3 rounded relative bg-zinc-500 overflow-hidden bg-opacity-5">
              {["Informações", "Clientes", "Serviços", "Comentários"].map(
                (item: string) => {
                  return (
                    <button
                      key={item}
                      className="p-3 font-semibold opacity-90 min-w-[6rem]"
                      onClick={moveIndicator}
                    >
                      {item}
                    </button>
                  );
                }
              )}
              <motion.span
                animate={{
                  left: indicator?.left || 0,
                  width: indicator?.width || "7rem",
                }}
                transition={{ type: "tween" }}
                className="absolute pointer-events-none w-[6rem] h-full rounded-md z-[-1] bg-zinc-500 bg-opacity-10 shadow-inner"
              />
            </div>
          </header>
          <section className="flex flex-col gap-7 p-3">
            <div className={`py-1 opacity-80 ${fontInter} flex flex-col gap-2`}>
              <h2 className="text-2xl font-semibold flex">
                <div className="w-[2rem] h-full" />
                {itemSelected?.name}
              </h2>
              <p className="text-sm flex items-center">
                <div className="w-[2rem] h-full justify-center flex ">
                  <BiSolidTime size="20" />
                </div>
                {itemSelected.allDay && (
                  <>
                    {moment(itemSelected.start).format("DD MMM. YYYY")} -{" "}
                    {moment(itemSelected.start).format("DD MMM. YYYY")}
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="w-[2rem] justify-center flex h-full opacity-80">
                  <FaExclamationCircle size="16" />
                </div>
                <h3 className="font-semibold opacity-60">Status:</h3>
              </div>
              <span className="font-semibold text-lg flex">
                <div className="w-[2rem] h-full " />
                <span>{status}</span>
              </span>
            </div>
            <div className="flex flex-1 w-full">
              <div className="w-[2rem] justify-center flex h-full opacity-80">
                <BsJustifyLeft size="20" />
              </div>
              <div className="bg-zinc-500 bg-opacity-10 w-full p-3 min-h-[10rem] rounded-md shadow-inner">
                <span className="font-semibold opacity-90">
                  {itemSelected?.description || "Nenhuma descrição"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center ">
                <div className="w-[2rem] justify-center items-center flex h-full opacity-80">
                  <FaList />
                </div>
                <h3 className="font-semibold opacity-60">Template:</h3>
              </div>
              <div className="flex">
                <div className="w-[2rem] h-full " />
                <div className="w-full max-w-[20rem] relative">
                  <motion.button 
                  whileTap={{ scale: 0.94 }}
                  className="p-3 bg-zinc-500 font-semibold bg-opacity-10 rounded-md flex w-full">
                    Urgente
                  </motion.button>
                  <div className="absolute w-full rounded-md h-full top-[100%] mt-2 p-2 bg-emerald-400">
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <footer className="flex w-full p-3 justify-end p-5">
          <Link
            href={`/calendar/details/${itemSelected.code}/`}
            className="bg-gradient-45 from-purple-600 to-blue-500 p-2 rounded px-3 text-white opacity-90 hover:opacity-100"
          >
            Terminar Evento
          </Link>
        </footer>
      </S.Modal>
    </motion.div>
  );
}
