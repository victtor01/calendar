"use client";

import { motion } from "framer-motion";
import * as S from "./style";
import { fontOpenSans } from "@/app/fonts";
import { IoCalendarClearSharp } from "react-icons/io5";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import moment from "moment-timezone";
import { Event } from "@/types/events";

function useEvents() {
  const api = useApiPrivate();

  const today = moment();
  const start = moment().startOf("month").format("MM/DD/YYYY");
  const end = moment().endOf("month").format("MM/DD/YYYY");

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      return (
        await api.post("/events/find-by-date", {
          start,
          end,
        })
      ).data;
    },
  });

  const { data: lastMonth, isLoading: isLoadingLastMonth } = useQuery<Event[]>({
    queryKey: ["events-last-month"],
    queryFn: async () => {
      return (
        await api.post("/events/find-by-date", {
          start: today.clone().subtract(1, "months").startOf("month"),
          end: today.clone().subtract(1, "months").endOf("month"),
        })
      ).data;
    },
  });

  const porcetage = (() => {
    const totalEventsToMonth = events?.length || 0;
    const totalEventsLastMonth = lastMonth?.length || 0;

    return (totalEventsToMonth / totalEventsLastMonth) * 100;
  })();

  return {
    data: {
      events,
      lastMonth,
      porcetage,
    },
    loading: {
      isLoading,
      isLoadingLastMonth,
    },
  };
}

export default function Events() {
  const {
    data: { events, lastMonth, porcetage },
    loading: { isLoadingLastMonth, isLoading },
  } = useEvents();

  if (isLoading || isLoadingLastMonth) return <Loading />;

  console.log(porcetage);

  return (
    <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
      <S.TitleComponent>
        <div className={`font-semibold opacity-70 ${fontOpenSans}`}>
          Events esse Mês
        </div>
        <div className="text-cyan-300">25.3%</div>
      </S.TitleComponent>
      <S.ContentComponent>
        <div className="flex flex-col gap-1 p-2">
          <IoCalendarClearSharp size="22" className="text-cyan-500" />
          <span className="text-xl font-semibold">{events?.length}</span>
          <p className="text-sm text-cyan-500">Events esse Mês</p>
        </div>
        <div className="relative items-center justify-center flex">
          <svg
            className="rotate-[-90deg]"
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <S.Circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="stroke-cyan-400"
            />
            <S.Progress
              initial={{ pathLength: 0 }}
              animate={{ pathLength: porcetage > 100 ? 1 : porcetage / 100 }}
              transition={{
                duration: 2,
                delay: 0.2,
                type: "spring",
              }}
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="stroke-cyan-500 relative"
            ></S.Progress>
          </svg>
          <span className="p-2 absolute font-semibold opacity-50 text-cyan-600">
            {porcetage || 0}%
          </span>
        </div>
      </S.ContentComponent>
    </motion.div>
  );
}
