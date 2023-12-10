"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { EventContentArg, EventSourceInput } from "@fullcalendar/core/index.js";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import { Event } from "../../../types/events";
import { AnimatePresence, motion } from "framer-motion";
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
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { fontInter, fontValela } from "@/app/fonts";
import Link from "next/link";

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
  }

  function eventDetails(arg: { event: Event }) {
    setLoading(true);
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

    await toast.promise(res, {
      pending: "Salvando alterações",
      success: "Salvo com sucesso!",
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

const CustomizeEvent = ({ eventInfo, setIdSelected }: any) => {
  return (
    <>
      <motion.button
        key={eventInfo.event.id}
        className="flex flex-col"
        onClick={() => setIdSelected(eventInfo.event.id)}
      >
        <strong>{eventInfo.event.title}</strong>
        <p>{eventInfo.timeText}</p>
      </motion.button>

      {/*  {modalVisible && (
        <motion.div
          key={`modal-${eventInfo.event.id}`}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 10000 }}
          className="fixed top-0 left-0 w-full h-screen bg-zinc-900 bg-opacity-10 z-[100] backdrop-blur-md flex justify-center items-center"
        >
          <button onClick={() => setModalVisible(false)}>FECHAR</button>
        </motion.div>
      )} */}
    </>
  );
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
        className="p-2 flex gap-[1rem] mx-auto w-full h-full"
      >
        {loading && (
          <div className="top-0 left-0 w-screen flex justify-center items-center h-screen bg-zinc-900 fixed bg-opacity-5 z-[20]">
            <Loading className="bg-cyan-600" />
          </div>
        )}
        <S.Annotations className="flex m-1 rounded flex-col relative p-3 w-full max-w-[15rem] mx-auto flex hover:shadow-xl transition-shadow">
          <S.Bubble />
          <header className="flex items-center gap-3 justify-between">
            Anotações
          </header>
        </S.Annotations>

        <AnimatePresence>
          {itemSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={idSelected}
              style={{ zIndex: 100 }}
              className="fixed top-0 left-0 w-full  h-screen bg-zinc-900 bg-opacity-10 z-[100] backdrop-blur-md flex justify-center items-center"
            >
              <S.Modal
                className="bg-zinc-800 flex flex-col shadow-xl rounded-md w-[30rem] h-[25rem] relative z-[100]"
                layoutId={"filter"}
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                exit={{ y: -40 }}
                transition={{ type: "spring" }}
              >
                <S.Bubble />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex p-3 rounded-md  absolute z-[30] top-0 right-0 absolute translate-x-[50%] translate-y-[-50%]"
                >
                  <button
                    className="bg-gradient-45 from-purple-500 opacity-90 hover:opacity-100 shadow-lg to-emerald-500 p-2 rounded-full flex w-auto"
                    onClick={() => setIdSelected(null)}
                  >
                    <IoClose size="24" />
                  </button>
                </motion.div>
                <section className="flex p-3 flex-1 flex-col">
                  <div className={`p-3 ${fontInter}`}>
                    <h1 className="text-2xl font-semibold">
                      {itemSelected?.name}
                    </h1>
                  </div>
                  <div className="p-3">
                    <span className="">
                      {itemSelected?.description || "Nenhuma descrição"}
                    </span>
                  </div>
                </section>
                <footer className="flex w-full p-3">
                  <Link href={`/events/details/${itemSelected.code}/`}>
                    Mais detalhes
                  </Link>
                </footer>
              </S.Modal>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col flex-1">
          <S.Content className="gap-4 max-w-[100rem] flex flex-col mx-auto">
            <Header />
            <S.Calendar
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-1 gap-2 p-2 z-[2] relative"
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
                  eventClick={(data: any) => setIdSelected(data.event.id)}
                  /* eventContent={(eventInfo: any) => {
                    return (
                      <button onClick={() => setItemSelected(event)}>
                        <strong>{eventInfo.event.title}</strong>
                        <p>{eventInfo.timeText}</p>
                      </button>
                    );
                  }} */
                  eventClassNames={"m-1 gap-2 overflow-hidden"}
                />
              </div>
              <div
                id="draggable-el"
                className="min-w-[12rem] roun/ded-md mt-16 gap-2 flex flex-col p-2"
              >
                <h1 className="font-semibold text-md p-2 text-center text-white bg-gradient-45 from-cyan-500 to-cyan-700">
                  Modelos de eventos
                </h1>
                {eventsTemplates?.map(
                  (event: EventsTemplates, index: number) => (
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
                  )
                )}
              </div>
            </S.Calendar>
          </S.Content>
        </div>
      </motion.main>
    </>
  );
}
