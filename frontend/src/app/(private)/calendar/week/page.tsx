"use client";
import { fontInter } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { Event } from "../types";
import { BsArrowRightShort, BsCheck } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const timeZone = "America/New_York"; // Por exemplo, Nova Iorque

interface EventsProps {
  eventsToday: Event[];
  eventsYesterday: Event[];
  eventsTomorrow: Event[];
}

function useWeek() {
  const api = useApiPrivate();
  const { data: weekEvents, isLoading } = useQuery({
    queryKey: ["events-week"],
    queryFn: async () => {
      return (await api.get("/events/find/week")).data;
    },
  });
  const [itemsForDelete, setItemsForDelete] = useState<number[] | null>(null);
  const [showModalDeleteItems, setShowModalDeleteItems] =
    useState<boolean>(false);

  const today = moment().tz(timeZone);
  const yesterday = moment().subtract(1, "days").tz(timeZone);
  const tomorrow = moment().add(1, "days").tz(timeZone);

  const events: EventsProps = {
    eventsYesterday: [],
    eventsToday: [],
    eventsTomorrow: [],
  };

  if (weekEvents && weekEvents.length > 0) {
    weekEvents.forEach((event: Event) => {
      const eventDate = moment(event.start);

      if (eventDate.isSame(today, "day")) {
        events.eventsToday.push(event);
      } else if (eventDate.isSame(yesterday, "day")) {
        events.eventsYesterday.push(event);
      } else if (eventDate.isSame(tomorrow, "day")) {
        events.eventsTomorrow.push(event);
      }
    });
  }

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

  if (isLoading) {
    return;
  }

  return (
    <div className="flex flex-col w-full p-2 items-center gap-3 mt-10">
      <div className="w-full flex max-w-[90rem] min-h-[3rem] rounded justify-between items-center">
        <h1 className={`text-2xl opacity-50 ${fontInter}`}>Minha semana</h1>
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
      </div>
      <div className="flex flex-wrap min-h-[40rem] h-auto gap-5 w-full max-w-[90rem]">
        {events &&
          Object.entries(events)?.map(([name, value], index) => (
            <div
              key={index}
              className="w-full min-w-[20rem] flex flex-1 flex-col "
            >
              <header className="flex w-full bg-zinc-200 p-3 bg-opacity-10 pl-3 justify-between items-center ">
                <h1 className="text-xl">{name}</h1>
                <span className="bg-cyan-500 text-white rounded p-2">
                  {moment(new Date()).format("DD / MM / YYYY")}
                </span>
              </header>
              {value?.length < 1 && (
                <div className="flex w-full">
                  <span className="opacity-80 p-3 text-normal text-black w-full bg-cyan-200 mt-3 rounded">
                    Sem eventos nesse dia!
                  </span>
                </div>
              )}
              {value?.map((item: Event) => {
                const backgroundButton = itemsForDelete?.includes(item.id)
                  ? "bg-cyan-400 border-none"
                  : "bg-transparent";
                return (
                  <div
                    key={item.id}
                    className="opacity-70 bg-zinc-300 bg-opacity-10 hover:opacity-100 border-b border-zinc-500 border-opacity-30 flex p-3 items-center gap-3"
                  >
                    {item.color && (
                      <span
                        style={{ background: item.color }}
                        className="p-1 rounded-full"
                      />
                    )}
                    <button
                      onClick={() => addItemForDelete(item.id)}
                      className={`${backgroundButton} flex justify-center text-white items-center border border-zinc-300 w-5 h-5 rounded cursor-pointe`}
                    >
                      {itemsForDelete?.includes(item.id) && (
                        <BsCheck size="18" />
                      )}
                    </button>
                    <div className="flex flex-1">{item.name}</div>
                    <div className="flex">
                      {moment
                        .tz(item.start.toString(), "America/Sao_Paulo")
                        .format("HH[h]mm")}
                    </div>{" "}
                    -
                    <div className="flex">
                      {moment
                        .tz(item.end.toString(), "America/Sao_Paulo")
                        .format("HH[h]mm")}
                    </div>
                    <div className="flex">
                      <Link
                        href={`/calendar/details/${item.code}`}
                        className="flex text-white justify-center items-center rounded bg-cyan-500 w-8 h-8"
                      >
                        <BsArrowRightShort size="25" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
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
