"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import { Event } from "../../../types/events";
import { AnimatePresence, motion } from "framer-motion";
import * as S from "./style";
import useEventsTemplates from "@/hooks/useEventsTemplates";
import { toast } from "react-toastify";
import { ClientComponent } from "@/components/calendar/details";
import AddClient from "../../../components/calendar/create";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

const variants = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
};

const useCalendar = () => {
  const api = useApiPrivate();

  const { data: eventsTemplates } = useEventsTemplates().getAll();

  const [selectedDay, setSelectedDay] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const { data: allEvents } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return (await api.get("/events")).data;
    },
  });

  async function handleEventReceive(arg: any) {
    const { event } = arg;

    const updatedEvent = allEvents.find(
      (upEvent: Event) => upEvent.id.toString() === event.id.toString()
    );

    if (!updatedEvent) {
      toast.error("Houve um erro, tente novamente mais tarde!");
      return;
    }

    updatedEvent.allDay = event.allDay;

    const dateStart = new Date(event.start);
    const dateEnd = event.end ? new Date(event.end) : new Date(dateStart);

    const updatedData = {
      ...updatedEvent,
      start: dateStart,
      end: dateEnd,
    };

    const res = api
      .put(`/events/update/${updatedEvent.id}`, updatedData)
      .catch((err) => console.log(err));

    await toast.promise(res, {
      pending: "Salvando alterações",
      success: "Salvo com sucesso!",
      error: "Houve um erro! Tente novamente mais tarde! ",
    });

    const { code } = updatedData;

    queryClient.setQueryData(["event", code], (prevData: any) => {
      if (prevData) return updatedData;
    });

    queryClient.setQueryData(["events"], (prevData: any) => {
      if (prevData) {
        return prevData.map((event: any) =>
          event.id === updatedEvent.id ? updatedData : event
        );
      } else {
        return prevData;
      }
    });

    queryClient.invalidateQueries(["events-week"]);
  }

  function openModalAddEvent(event: any) {
    setSelectedDay({
      start: event.start,
      end: event.end,
    });
  }

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          let color = eventEl.getAttribute("color");
          return { title, id, start, color };
        },
      });
    }
  }, []);

  return {
    handles: {
      openModalAddEvent,
      handleEventReceive,
      setSelectedDay,
    },
    utils: {
      selectedDay,
    },
    data: {
      eventsTemplates,
      allEvents,
    },
  };
};

export default function Calendar() {
  const {
    handles: { openModalAddEvent, setSelectedDay, handleEventReceive },
    data: { allEvents },
    utils: { selectedDay },
  } = useCalendar();

  const [idSelected, setIdSelected] = useState<number | null>(null);

  const itemSelected: Event | null =
    allEvents?.filter(
      (event: Event) => event.id.toString() === idSelected?.toString()
    )[0] || null;

  return (
    <>
      <motion.main
        variants={variants}
        initial="pageInitial"
        animate="pageAnimate"
        className="py-2 flex gap-[1rem] mx-auto flex-col w-full max-w-[110rem] h-full relative"
      >
        <div className="flex flex-col flex-1">
          <S.Content className="gap-4 flex flex-col mx-auto">
            <S.Calendar
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-1 gap-2 p-4 z-[2] relative bg-white border-2 border-white dark:border-zinc-900  dark:bg-zinc-900 shadow-inner dark:shadow-black shadow-zinc-300 mb-4 rounded"
            >
              <div className="col-span-8 max-h-auto w-full">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek",
                  }}
                  events={
                    allEvents?.map((event: Event) => {
                      const { name, color, ...rest } = event;
                      return {
                        title: event.name,
                        color: color || "var(--purple)",
                        ...rest,
                      };
                    }) as EventSourceInput
                  }
                  nowIndicator={true}
                  editable={true}
                  droppable={true}
                  selectable={true}
                  selectMirror={true}
                  height={"auto"}
                  eventDrop={handleEventReceive}
                  eventClick={(data: any) => setIdSelected(data.event.id)}
                  select={openModalAddEvent}
                  eventClassNames={"m-1 gap-1 overflow-hidden"}
                />
              </div>
            </S.Calendar>
          </S.Content>
        </div>
      </motion.main>
      <AnimatePresence>
        {selectedDay?.start && (
          <AddClient
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
          />
        )}

        {itemSelected && (
          <ClientComponent
            itemSelected={itemSelected}
            setIdSelected={setIdSelected}
          />
        )}
      </AnimatePresence>
    </>
  );
}
