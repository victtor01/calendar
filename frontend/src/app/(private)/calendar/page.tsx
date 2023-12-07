"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import { Event } from "../../../types/events";
import { motion } from "framer-motion";
import * as S from "./style";
import Header from "./header";
import useEventsTemplates, {
  EventsTemplates,
} from "@/hooks/useEventsTemplates";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import Loading from "@/components/loading";
import { ToastContainer, toast } from "react-toastify";

const variants = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
};

const useCalendar = () => {
  const api = useApiPrivate();
  const { push } = useRouter();
  const { data: eventsTemplates } = useEventsTemplates().getAll();
  const [loading, setLoading] = useState<boolean>(false);

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
      return;
    }

    updatedEvent.allDay = event.allDay;

    const dateStart = moment(event.start).tz("America/Sao_Paulo");
    const dateEnd = event.end
      ? moment(event.end).tz("America/Sao_Paulo")
      : dateStart;

    const updatedData = {
      ...updatedEvent,
      start: dateStart.format("YYYY-MM-DDTHH:mm:ss.SSS"),
      end: dateEnd.format("YYYY-MM-DDTHH:mm:ss.SSS"),
    };

    const res = api
      .put(`/events/update/${updatedEvent.id}`, updatedData)
      .catch((err) => console.log(err));

    toast.promise(res, {
      pending: "Salvando alterações",
      success: "Salvo com sucesso! 👌",
      error: "Houve um erro! Tente novamente mais tarde! ",
    });

    const { code } = updatedData;
    queryClient.setQueryData(["event", code], (prevData: any) => {
      if (prevData) {
        return updatedData;
      }
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
  }

  function eventDetails(arg: { event: Event }) {
    const { id } = arg.event;
    const { code } = allEvents.filter(
      (even: Event) => even.id.toString() === id.toString()
    )[0];
    push(`/calendar/details/${code}`);
  }

  async function addEvent(data: DropArg) {
    const templete = eventsTemplates.filter(
      (even: EventsTemplates) =>
        even.id.toString() === data.draggedEl.id.toString()
    )[0];

    if (!templete) {
      return;
    }

    const res = api.post("/events/create", {
      name: data.draggedEl.innerText,
      description: "",
      allDay: data.allDay,
      start: data.date.toISOString(),
      end: data.date.toISOString(),
    });

    toast.promise(res, {
      pending: "Salvando alterações",
      success: "Salvo com sucesso! 👌",
      error: "Houve um erro! Tente novamente mais tarde! ",
    });

    queryClient.invalidateQueries(["events"]);
    queryClient.invalidateQueries(["events-weeks"]);
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
    eventsTemplates,
    allEvents,
    addEvent,
    handleEventReceive,
    eventDetails,
    loading,
  };
};

export default function Calendar() {
  const {
    eventsTemplates,
    allEvents,
    loading,
    handleEventReceive,
    addEvent,
    eventDetails,
  } = useCalendar();

  return (
    <motion.main
      variants={variants}
      initial="pageInitial"
      animate="pageAnimate"
      className="p-2 m-auto flex"
    >
      {loading && (
        <div className="top-0 left-0 w-screen flex justify-center items-center h-screen bg-zinc-900 fixed bg-opacity-5 z-[20]">
          <Loading className="bg-cyan-600" />
        </div>
      )}

      <S.Content className="flex gap-4  flex-col justify-center max-w-[95rem] mx-auto rounded-lg">
        <Header />
        <S.Calendar
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-1 gap-2 p-5 rounded-xl"
        >
          <div className="col-span-8 max-h-auto w-full max-w-[80rem]">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek",
              }}
              events={
                allEvents?.map((event: Event) => {
                  const { name, ...rest } = event;
                  return {
                    title: event.name,
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
              drop={(data) => addEvent(data)}
              eventClick={(data: any) => eventDetails(data)}
              eventClassNames={"p-2 m-1 gap-2 overflow-hidden"}
            />
          </div>
          <div
            id="draggable-el"
            className="min-w-[12rem] roun/ded-md mt-16 gap-2 flex flex-col p-2"
          >
            <h1 className="font-semibold text-md p-2 text-center text-white bg-gradient-45 from-cyan-500 to-cyan-700">
              Modelos de eventos
            </h1>
            {eventsTemplates?.map((event: EventsTemplates, index: number) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index / 5 }}
                id={event.id.toString()}
                title={event.name}
                key={event.id}
                className="fc-event w-full p-2 overflow-hidden flex bg-cyan-500 text-white relative rounded"
              >
                <span className="absolute left-0 top-0 h-full w-1" />
                {event.name}
              </motion.div>
            ))}
          </div>
        </S.Calendar>
      </S.Content>
    </motion.main>
  );
}
