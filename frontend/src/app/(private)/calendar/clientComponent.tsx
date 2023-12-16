"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { fontInter, fontValela } from "@/app/fonts";
import { Event, StatusEvent } from "@/types/events";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import * as S from "./style";
import moment from "moment-timezone";
import Link from "next/link";
import { FaExclamationCircle, FaList, FaPen } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { BiSolidTime } from "react-icons/bi";
import { BsJustifyLeft } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "@/hooks/apiPrivate";
import { EventsTemplates } from "@/types/eventsTemplates";
import { useRouter } from "next/navigation";
import { Service } from "@/types/services";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";

type Page = "INFORMATIONS" | "CLIENTS" | "SERVICES" | "COMMENTARIES";

interface ClientComponentProps {
  itemSelected: Event;
  setIdSelected: Dispatch<SetStateAction<number | null>>;
}

interface Popup {
  templates: boolean;
}

const StatusPT: Record<StatusEvent, string> = {
  ACTIVATED: "Ativado!",
  CONCLUDED: "Concluído!",
  FILED: "Arquivado!",
};

const PagePT: Record<Page, string> = {
  CLIENTS: "Clientes",
  INFORMATIONS: "Informações",
  COMMENTARIES: "Comentários",
  SERVICES: "Services",
};

function useClientComponent() {
  const api = useApiPrivate();
  const [page, setPage] = useState<Page>("INFORMATIONS");
  const [popups, setPopups] = useState<Popup>({
    templates: false,
  });
  const [indicator, setIndicator] = useState<{
    width: number;
    left: number;
  } | null>(null);

  const { data: templates } = useQuery({
    queryKey: ["events-templates"],
    queryFn: async () => {
      return (await api.get("/events-templates")).data;
    },
  });

  function handlePopup(key: string) {
    setPopups((prev) => {
      const prevBool = prev[key as keyof Popup];

      return {
        ...prev,
        [key as keyof Popup]: !prevBool,
      };
    });
  }

  function moveIndicator(data: Page, event: React.MouseEvent<HTMLElement>) {
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

    setPage(data);
  }

  return {
    data: {
      templates,
    },
    utils: {
      indicator,
      popups,
      page,
    },
    handles: {
      moveIndicator,
      handlePopup,
    },
  };
}

export function ClientComponent({
  itemSelected,
  setIdSelected,
}: ClientComponentProps) {
  const {
    data: { templates },
    utils: { indicator, popups, page },
    handles: { moveIndicator, handlePopup },
  } = useClientComponent();

  const router = useRouter();

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
      className="fixed top-0 left-0 w-full h-screen bg-zinc-800 bg-opacity-10 overflow-x-hidden z-[100] p-4 flex justify-center overflow-y-auto"
    >
      <motion.section
        className="bg-white dark:bg-zinc-900 flex flex-col shadow-2xl rounded-md max-w-[55rem] min-h-[40rem] h-auto w-full relative z-[100] my-auto"
        initial={{ scale: 0 }}
        transition={{ type: "tween" }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <header className="flex p-2 border-b border-zinc-500 items-center border-opacity-20 justify-between">
          <div className="text-lg opacity-80">
            <h1 className={`${fontValela} opacity-80`}>Detalhes do evento</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                router.push(`/calendar/details/${itemSelected?.code}`)
              }
              className="opacity-80 hover:opacity-100 rounded-full p-3 hover:bg-zinc-400 hover:bg-opacity-10"
            >
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
        <section className="flex py-3 flex-1 flex-col">
          <header className="flex">
            <div className="flex mx-auto gap-3 rounded relative overflow-hidden">
              {["INFORMATIONS", "SERVICES", "CLIENTS", "COMMENTARIES"].map(
                (item: string) => {
                  return (
                    <button
                      key={item}
                      className="p-3 font-semibold opacity-90 min-w-[6rem]"
                      onClick={(e) => moveIndicator(item as Page, e)}
                    >
                      {PagePT[item as Page]}
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
          {page === "INFORMATIONS" && (
            <section className="flex flex-col gap-7 p-3">
              <div
                className={`py-1 opacity-80 ${fontInter} flex flex-col gap-2`}
              >
                <h2 className="text-2xl font-semibold flex">
                  <div className="w-[2rem] h-full" />
                  {itemSelected?.name}
                </h2>
                <div className="text-sm flex items-center">
                  <div className="w-[2rem] h-full justify-center flex ">
                    <BiSolidTime size="20" />
                  </div>
                  {itemSelected.allDay && (
                    <>
                      {moment(itemSelected.start).format("DD MMM. YYYY")} -{" "}
                      {moment(itemSelected.end).format("DD MMM. YYYY")}
                    </>
                  )}
                  {!itemSelected.allDay && (
                    <div className="flex gap-3 items-center">
                      <div className="flex items-center gap-1">
                        <span>
                          {moment(itemSelected.start).format("DD MMM. YYYY")}
                        </span>
                        <p className="bg-zinc-500 bg-opacity-10 font-semibold rounded p-2">
                          {moment(itemSelected.start).format("HH[h]mm")}
                        </p>
                      </div>
                      -
                      <div className="flex items-center gap-1">
                        <span>
                          {moment(itemSelected.end).format("DD MMM. YYYY")}
                        </span>
                        <p className="bg-zinc-500 bg-opacity-10 font-semibold rounded p-2">
                          {moment(itemSelected.end).format("HH[h]mm")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
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
                      onClick={() => handlePopup("templates")}
                      whileTap={{ scale: 0.94 }}
                      className="p-3 bg-zinc-500 font-semibold bg-opacity-10 rounded-md flex w-full"
                    >
                      Nenhum selecionado!
                    </motion.button>
                    <AnimatePresence>
                      {popups["templates"] && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          key={"modal-template"}
                          className="absolute w-full p-0 rounded-md h-[5rem] overflow-auto top-[100%] p-2 rounded mt-2 bg-zinc-500 bg-opacity-5"
                        >
                          {templates?.map(
                            (template: EventsTemplates, index: number) => {
                              return (
                                <motion.button
                                  key={index}
                                  className="flex items-center w-full gap-3 p-1 px-3 rounded hover:bg-zinc-500 bg-opacity-10"
                                >
                                  <span
                                    className="p-1 w-3 h-3 rounded"
                                    style={{ background: template.color }}
                                  />
                                  <div className="">{template.name}</div>
                                </motion.button>
                              );
                            }
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </section>
          )}
          {page === "SERVICES" && (
            <section className="flex flex-col gap-7 mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nome do serviço
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Criado em
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Preço
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemSelected?.services?.map((service: Service) => {
                    return (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {service?.name}
                        </th>
                        <td className="px-6 py-4">
                          {moment(service.createdAt).format(
                            "DD, MMM [de] YYYY"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {convertToRealMoney.format(service.price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
        </section>
        <footer className="flex w-full p-3 justify-end p-5">
          <Link
            href={`/calendar/details/${itemSelected.code}/`}
            className="bg-gradient-45 from-purple-600 to-blue-500 p-2 rounded px-3 text-white opacity-90 hover:opacity-100"
          >
            Terminar Evento
          </Link>
        </footer>
      </motion.section>
    </motion.div>
  );
}
