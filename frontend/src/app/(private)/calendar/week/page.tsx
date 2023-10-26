"use client";
import { fontInter } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { Event } from "../types";
import { BsArrowRightShort, BsCheck } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";

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

  return {
    query: { events, isLoading },
    utils: { itemsForDelete, addItemForDelete },
  };
}

export default function Week() {
  const {
    query: { events, isLoading },
    utils: { itemsForDelete, addItemForDelete },
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
            <button className="flex opacity-60 hover:bg-zinc-200 rounded-full hover:bg-opacity-20 p-3 hover:opacity-100">
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
              className="w-full min-h-[20rem] min-w-[20rem] flex flex-1 flex-col "
            >
              <header className="flex w-full p-4 rounded bg-cyan-300">
                <h1 className="text-gray-700 text-xl">{name}</h1>
              </header>
              {value?.map((item: Event) => {
                const backgroundButton = itemsForDelete?.includes(item.id)
                  ? "bg-cyan-400 border-none"
                  : "bg-transparent";
                return (
                  <div
                    key={item.id}
                    className="opacity-70 hover:opacity-100 border-b border-zinc-500 border-opacity-30 flex p-3 items-center gap-3"
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
                      {itemsForDelete?.includes(item.id) && <BsCheck size="18"/>}
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
                      <button className="flex text-white justify-center items-center rounded bg-cyan-500 w-8 h-8">
                        <BsArrowRightShort size="25" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
}
