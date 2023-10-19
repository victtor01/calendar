"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ChangeEvent, HTMLAttributes, useEffect, useState } from "react";
import moment from "moment-timezone";
import { EventSourceInput } from "@fullcalendar/core/index.js";

interface Event {
  id: number;
  title: string;
  end: Date | string;
  start: Date | string;
  allDay?: boolean;
  color?: string;
}

const useCalendar = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Eventos que fica na barra lateral direita
  const [events, setEvents] = useState([
    { title: "Consulta", id: "1", color: "red" },
  ]);

  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    end: "",
    allDay: false,
    id: 0,
    color: "",
  });

  // Quando clicar em algum evento
  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  // FUnção pára quando passar para algum outro lugar
  function handleEventReceive(arg: any) {
    console.log(arg.event);
    const { event } = arg;
    const updatedEvents = allEvents.map((item) => {
      const date = moment(event.start).tz("America/Sao_Paulo");
      const dataFormatada = date.format("YYYY-MM-DDTHH:mm:ss.SSS");

      return item.id.toString() === event.id.toString()
        ? {
            ...item,
            start: dataFormatada,
            end: event.end,
            allDay: event.allDay,
          }
        : item;
    });
    setAllEvents(updatedEvents);
  }

  // Para quando arrastar e soltar para dentro do calendário
  function addEvent(data: DropArg) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      end: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }

  const [valuesEventForm, setValuesEventForm] = useState({
    id: 0,
    title: "",
    start: "",
    end: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValuesEventForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function addEventInput() {
    setAllEvents([
      ...allEvents,
      {
        ...valuesEventForm,
        id: parseInt((Math.random() * 10000).toString()),
      },
    ]);
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
    events,
    allEvents,
    handleDateClick,
    handleEventReceive,
    valuesEventForm,
    addEvent,
    onChange,
    addEventInput,
  };
};

export default function Calendar() {
  const {
    events,
    allEvents,
    handleDateClick,
    handleEventReceive,
    valuesEventForm,
    addEvent,
    onChange,
    addEventInput,
  } = useCalendar();

  return (
    <div className="flex flex-col w-full justify-center items-center gap-2 p-3">
      <div className="text-2xl">Calendario</div>
      <input
        type="date"
        value={valuesEventForm.start}
        name="start"
        onChange={onChange}
        className="border bg-red-100"
      />
      <input
        type="date"
        value={valuesEventForm.end}
        name="end"
        onChange={onChange}
        className="border bg-red-100"
      />
      <input
        type="text"
        value={valuesEventForm.title}
        name="title"
        onChange={onChange}
        className="border bg-red-100"
      />
      <button onClick={addEventInput}>enviar</button>
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
            height={"auto"}
            dateClick={handleDateClick}
            eventDrop={handleEventReceive}
            drop={(data) => addEvent(data)}
            eventClick={() => null}
          />
        </div>
        <div
          id="draggable-el"
          className="min-w-[13rem] rounded-md mt-16 p-2 gap-2 flex flex-col border border-zinc-500 border-opacity-20"
        >
          <h1 className="font-bold text-lg text-center opacity-70">
            Modelos de eventos
          </h1>
          {events?.map((event) => (
            <div
              title={event.title}
              key={event.id}
              className="fc-event w-full p-2 flex border bg-cyan-500 text-white rounded"
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
