"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import useEventsTemplates, {
  EventsTemplates,
} from "@/hooks/useEventsTemplates";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import { Event } from "./types";

function renderEventContent(arg: any) {
  const { event } = arg;
  return (
    <div>
      <strong>{event?.extendedProps.name}</strong>
    </div>
  );
}

const useCalendar = () => {
  const api = useApiPrivate();
  const { push } = useRouter();
  const { data: eventsTemplates } = useEventsTemplates().getAll();

  const { data: allEvents } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      return (await api.get("/events")).data;
    },
  });

  function eventDetails(arg: any) {
    const { id } = arg.event;
    const { code } = allEvents.filter(
      (even: Event) => even.id.toString() === id.toString()
    )[0];
    push(`/calendar/details/${code}`);
  }

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

    await api
      .put(`/events/update/${updatedEvent.id}`, updatedData)
      .catch((err) => console.log(err));

    queryClient.refetchQueries(["events"]);
  }

  async function addEvent(data: DropArg) {
    const templete = eventsTemplates.filter(
      (even: EventsTemplates) =>
        even.id.toString() === data.draggedEl.id.toString()
    )[0];

    if (!templete) {
      return;
    }

    await api.post("/events/create", {
      name: data.draggedEl.innerText,
      description: "Teste",
      allDay: data.allDay,
      start: data.date.toISOString(),
      end: data.date.toISOString(),
    });

    queryClient.invalidateQueries(["events"]);
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
    handleEventReceive,
    addEvent,
    eventDetails,
  };
};

export default function Calendar() {
  const {
    eventsTemplates,
    allEvents,
    handleEventReceive,
    addEvent,
    eventDetails,
  } = useCalendar();

  return (
    <div className="flex gap-4 p-4 max-h-auto w-full max-w-[80rem]">
      <div className="col-span-8 max-h-auto">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          events={allEvents as EventSourceInput}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          eventContent={renderEventContent}
          height={"auto"}
          eventDrop={handleEventReceive}
          drop={(data) => addEvent(data)}
          eventClick={(data: any) => eventDetails(data)}
          eventBackgroundColor="rgba(0,0,0,0)"
          eventClassNames={"p-1 m-1 overflow-hidden"}
        />
      </div>
      <div
        id="draggable-el"
        className="min-w-[12rem] rounded-md mt-16 gap-2 flex flex-col"
      >
        <h1 className="font-bold text-lg p-2 rounded text-center text-white bg-cyan-800">
          Modelos de eventos
        </h1>
        {eventsTemplates?.map((event: EventsTemplates) => (
          <div
            id={event.id.toString()}
            title={event.name}
            key={event.id}
            className="fc-event w-full p-2 overflow-hidden flex bg-cyan-500 text-white relative rounded"
          >
            <span
              className="absolute left-0 top-0 h-full w-1"
              /* style={{
                  background: event?.color || "cyan",
                }} */
            />
            {event.name}
          </div>
        ))}
      </div>
    </div>
  );
}
