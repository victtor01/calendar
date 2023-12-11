"use client";
import { fontInter, fontOpenSans, fontRoboto, fontValela } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { Event } from "../../../../types/events";
import { BsArrowLeft, BsArrowRightShort, BsCheck } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { Fragment, useState } from "react";
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

  function addItemForDelete(id: number) {
    setItemsForDelete((prev: number[] | null) => {
      if (prev === null) {
        return [id];
      }
      if (!prev.includes(id)) {
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  }

  async function deleteItems() {
    if (itemsForDelete) {
      const res = await api.delete(`/events/delete-many/`, {
        data: { ids: [...itemsForDelete] },
      });
      console.log(res);
    }
  }

  const handleShowModalDeleteItems = () =>
    setShowModalDeleteItems((prev) => !prev);

  return {
    query: { events, isLoading },
    utils: { itemsForDelete, addItemForDelete },
    modal: { handleShowModalDeleteItems, deleteItems, showModalDeleteItems },
  };
}

export default function Week() {
  const {
    query: { events, isLoading },
    utils: { itemsForDelete, addItemForDelete },
    modal: { handleShowModalDeleteItems, deleteItems, showModalDeleteItems },
  } = useWeek();

  if (isLoading) return;

  const eventsGroups = (() => {
    if (!events) return null;
    const data: Record<string, Event[]> = {};

    const currentDate = moment();
    const minDate = currentDate.subtract(3, "days");

    const maxDate = moment.max(events.map((event: Event) => moment(event.end)));

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
      const key = moment(event.start, "YYYY-MM-DD").format(dateFormat);

      // Certifique-se de que data[key] esteja definido antes de chamar push
      if (data[key]) {
        data[key].push(event);
      } else {
        // Se data[key] não estiver definido, pode ser necessário inicializá-lo
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
        <div className="flex">
          {itemsForDelete && itemsForDelete?.length > 0 && (
            <button
              onClick={handleShowModalDeleteItems}
              className="flex opacity-60 hover:bg-zinc-200 rounded-full hover:bg-opacity-20 p-3 hover:opacity-100"
            >
              <BiTrash size="21" />
            </button>
          )}
        </div>
      </header>
      <div className="flex overflow-auto min-h-[40rem] h-auto gap-2 scroll-none w-full max-w-[160rem]">
        {eventsGroups &&
          Object.entries(eventsGroups)?.map(([date, value], index: number) => (
            <S.ThemeComponent
              key={index}
              className="bg-zinc-400 gap-3 bg-opacity-10 min-w-[20rem] mx-auto p-3 rounded-xl"
            >
              <header className="py-3 font-semibold text-lg">
                {moment(date, "DD/MM/YYYY").format("ddd, DD, MM [de] YYYY")}
              </header>
              <section className="flex flex-col gap-4">
                {value?.map((event: Event, index: number) => {
                  return (
                    <S.ContainerClient
                      key={index}
                      className={`p-2 flex-col bg-zinc-400 gap-2 bg-opacity-5 flex rounded hover:shadow-xl font-semibold transition-shadow ${fontOpenSans}`}
                    >
                      <header className="flex justify-between w-auto items-center">
                        <span
                          className={`font-semibold opacity-80 font-semibold ${fontOpenSans}`}
                        >
                          {event.name}
                        </span>
                        <span className={`flex flex-col text-xs text-end ${fontValela}`}>
                          Criado em:
                          <span>
                            {moment(event.createdAt).format(
                              "ddd, MMM [de] YYYY"
                            )}
                          </span>
                        </span>
                      </header>
                      <section className="block">
                        <div className="p-2 bg-zinc-500 bg-opacity-5 shadow-inner">{event?.description || "Nenhum descrição"}</div>
                        <div className="flex flex-col">
                          {event?.services?.length || 0} Serviços
                        </div>
                      </section>
                      <footer className="flex justify-between w-full py-3 items-center">
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
                                        /*  priority */
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        /* quality={25} */
                                        /* style={{ objectFit: "cover" }} */
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
                      </footer>
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
