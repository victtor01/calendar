"use client";
import { fontInter, fontOpenSans, fontRoboto, fontValela } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { Event } from "../../../../types/events";
import { BsArrowLeft, BsArrowRightShort } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as S from "./style";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Clients } from "@/types/clients";
import Image from "next/image";
import { Server } from "@/constants/server";
import { useRouter } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Loading from "./loading";

function useWeek() {
  const api = useApiPrivate();
  const { data: events, isLoading } = useQuery({
    queryKey: ["events", "events-week"],
    queryFn: async () => {
      return (await api.get("/events/find/week")).data;
    },
  });
  const [itemsForDelete, setItemsForDelete] = useState<number[] | null>(null);
  const [showModalDeleteItems, setShowModalDeleteItems] =
    useState<boolean>(false);

  async function deleteItems() {
    if (itemsForDelete) {
      const res = await api.delete(`/events/delete-many/`, {
        data: { ids: [...itemsForDelete] },
      });
      console.log(res);
    }
  }

  function scroll() {
    var slider = window.document.getElementById("scroll-component");

    const left = () => {
      if (slider instanceof HTMLElement && slider.scrollLeft !== undefined) {
        const value = slider.scrollLeft - 500;
        slider.scrollLeft -= 500;

        if (value > 0) {
          slider.style.boxShadow = "inset 3px 0 3px -2px rgba(0, 0, 0, 0.1)";
        } else {
          slider.style.boxShadow = "none";
        }
      }
    };

    const right = () => {
      if (slider instanceof HTMLElement && slider.scrollLeft !== undefined) {
        const value = slider.scrollLeft + 500;
        slider.scrollLeft += 500;

        if (value > 0) {
          slider.style.boxShadow = "inset 3px 0 3px -2px rgba(0, 0, 0, 0.1)";
        } else {
          slider.style.boxShadow = "none";
        }
      }
    };

    return {
      left,
      right,
    };
  }

  const handleShowModalDeleteItems = () =>
    setShowModalDeleteItems((prev) => !prev);

  return {
    query: { events, isLoading },
    utils: { itemsForDelete, scroll },
    modal: { handleShowModalDeleteItems, deleteItems, showModalDeleteItems },
  };
}

export default function Week() {
  const {
    query: { events, isLoading },
    utils: { itemsForDelete, scroll },
    modal: { handleShowModalDeleteItems, deleteItems, showModalDeleteItems },
  } = useWeek();

  const router = useRouter();

  if (isLoading) return;

  const eventsGroups = (() => {
    if (!events) return null;

    const data: Record<string, Event[]> = {};

    const minDate = moment().clone().subtract(3, "days");
    const maxDate = moment().clone().add(3, "days");

    const dateFormat = "DD/MM/YYYY";

    for (
      let date = moment(minDate);
      date.isSameOrBefore(maxDate);
      date.add(1, "day")
    ) {
      const key = date.format(dateFormat);
      data[key] = [];
    }

    events.forEach((event: Event) => {
      const key = moment(event.start).format(dateFormat);
      if (data[key]) {
        data[key].push(event);
      } else {
        data[key] = [event];
      }
    });

    return data;
  })();

  return (
    <div className="flex flex-col w-full p-2 items-center gap-3 mt-0">
      <header className="w-full flex min-h-[3rem] rounded justify-between items-center">
        <Link
          href={"/calendar"}
          className="flex items-center gap-3 opacity-50 hover:opacity-90"
        >
          <BsArrowLeft />
          <h1 className={`text-lg ${fontInter}`}>Calendário</h1>
        </Link>
        <div className="flex gap-2">
          <button onClick={() => scroll().left()}>
            <FaAngleLeft size="25" />
          </button>
          <button onClick={() => scroll().right()}>
            <FaAngleRight size="25" />
          </button>
        </div>
      </header>
      <div
        id="scroll-component"
        className="flex overflow-x-scroll snap-x scroll-none scroll-smooth min-h-[40rem] h-auto gap-2 w-full max-w-[160rem]"
      >
        {eventsGroups &&
          Object.entries(eventsGroups)?.map(([date, value], index: number) => (
            <S.ThemeComponent
              key={index}
              className={`bg-zinc-400 gap-3 w-full bg-opacity-10 min-w-[20rem] mx-auto p-3 rounded-xl opacity-80 transition-opacity hover:opacity-100`}
            >
              <header className="py-3 font-semibold text-lg flex justify-between">
                {moment(date, "DD/MM/YYYY").format("DD/MM") ===
                  moment().format("DD/MM") && <span>Hoje</span>}
                {moment(date, "DD/MM/YYYY").format("ddd, DD, MM [de] YYYY")}
              </header>
              <section className="flex flex-col gap-4">
                {value?.map((event: Event, index: number) => {
                  return (
                    <S.ContainerClient
                      onClick={() => {
                        router.push(`/calendar/details/${event.code}`);
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", delay: index / 7 }}
                      key={index}
                      className={`p-2 flex-col bg-zinc-300 shadow gap-2 bg-opacity-5 flex rounded hover:shadow-xl transition-shadow ${fontOpenSans}`}
                    >
                      <header className="flex justify-between w-auto items-center w-full">
                        <span
                          className={`font-semibold opacity-80 font-semibold ${fontOpenSans}`}
                        >
                          {event.name}
                        </span>
                        <span
                          className={`flex flex-col text-xs text-end ${fontValela}`}
                        >
                          Criado em:
                          <span>
                            {moment(event.createdAt).format(
                              "ddd, MMM [de] YYYY"
                            )}
                          </span>
                        </span>
                      </header>
                      <section
                        className={`flex flex-col w-full items-start gap-2 ${fontRoboto}`}
                      >
                        <div className="p-2 bg-zinc-500 bg-opacity-5 shadow-inner w-full text-left items-start">
                          {event?.description || "Nenhum descrição"}
                        </div>
                        <div
                          className={`flex flex-col p-1 px-2 font-semibold text-xs text-white rounded ${
                            event?.services?.length
                              ? "bg-cyan-500 bg-opacity-60"
                              : "bg-rose-600"
                          }`}
                        >
                          {event?.services?.length || 0} Serviços
                        </div>
                      </section>
                      <section className="flex justify-between w-full pb-3 items-center">
                        <div>Clientes:</div>
                        <div className="flex relative h-[2rem] flex-row-reverse flex-row">
                          {event?.clients
                            ?.slice(0, 2)
                            ?.map((client: Clients, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="absolute z-20"
                                  style={{
                                    marginRight: 10 + index * 10,
                                    zIndex: 5 - index,
                                  }}
                                >
                                  <S.PhotoClient className="relative w-10 h-10 rounded-full bg-gradient-45 from-purple-700 to-cyan-500 overflow-hidden border border-green-300">
                                    {client?.photo && (
                                      <Image
                                        className="hover:scale-[1.1] transition-all"
                                        src={`${Server}/uploads/clients/${client?.photo}`}
                                        /*  sizes="(max-width: 768px) 4rem, (max-width: 1200px) 2rem, 2rem" */
                                        priority
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        /* quality={25} */
                                        style={{ objectFit: "cover" }}
                                        alt="Foto do cliente"
                                      />
                                    )}
                                  </S.PhotoClient>
                                </div>
                              );
                            })}
                          {!event?.clients?.length && (
                            <div className="absolute right-0 z-50 opacity-30">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-500 text-white flex items-center justify-center">
                                0
                              </div>
                            </div>
                          )}
                          {event?.clients && event.clients.length > 2 && (
                            <div className="absolute right-0 z-50">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-500 text-white flex items-center justify-center">
                                +{event.clients.length - 2}
                              </div>
                            </div>
                          )}
                        </div>
                      </section>
                    </S.ContainerClient>
                  );
                })}
              </section>
            </S.ThemeComponent>
          ))}
      </div>
      <Modal
        onOpenChange={handleShowModalDeleteItems}
        isDismissable={false}
        isOpen={showModalDeleteItems && !!itemsForDelete}
        className="bg-zinc-900"
      >
        <ModalContent className="flex">
          <ModalHeader className="flex flex-col gap-1">
            Deletar Item(s)
          </ModalHeader>
          <form>
            <ModalBody>
              <p className="text-lg">
                Tem certeza que Deseja Exlcluir{" "}
                <span className="text-rose-600">
                  {itemsForDelete?.length} evento(s)?
                </span>
              </p>
              <p>
                Após excluir não terá como recuperar esses eventos de nenhum
                forma!
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="rounded-lg opacity-80 hover:opacity-100"
                onClick={() => null}
              >
                Fechar
              </Button>
              <Button
                onClick={deleteItems}
                color="danger"
                className="rounded-lg bg-rose-600 opacity-80 hover:opacity-100"
                type="button"
              >
                Excluir!
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
