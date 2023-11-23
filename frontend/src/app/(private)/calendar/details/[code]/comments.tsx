"use client";

import { fontRoboto } from "@/app/fonts";
import Input from "@/components/input/input";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { Event } from "@/types/events";
import { ChangeEvent, useState } from "react";
import { BsFillSendFill, BsListNested } from "react-icons/bs";
import moment from "moment-timezone";
import { motion } from "framer-motion";

interface CommentsProps {
  event: Event;
}

function useComments({ event }: CommentsProps) {
  const [contentEventsComments, setContentEventsComments] =
    useState<string>("");

  function onChangeContentEventsComments(e: ChangeEvent<HTMLInputElement>) {
    setContentEventsComments(e.target.value.toString());
  }

  const api = useApiPrivate();

  async function createEventsComments() {
    const comment = (
      await api.post("/events-comments/create", {
        content: contentEventsComments,
        eventId: event.id,
      })
    ).data;

    queryClient.setQueryData(["event", event.code], (prevData: any) => {
      return {
        ...prevData,
        comments: prevData.comments ? [comment, ...prevData.comments] : [],
      };
    });
  }

  return {
    onChangeContentEventsComments,
    contentEventsComments,
    createEventsComments,
  };
}

export default function Comments({ event }: CommentsProps) {
  const {
    onChangeContentEventsComments,
    contentEventsComments,
    createEventsComments,
  } = useComments({ event });

  return (
    <form className="flex flex-col max-w-[30rem] w-full gap-2 justify-center  mx-auto items-center">
      <div
        className={`rounded opacity-70 w-full h-10 flex items-center gap-3 ${fontRoboto}`}
      >
        <BsListNested size="18" />
        <h1 className="text-xl">Meus comentários</h1>
      </div>
      <div className="flex flex-1 w-full flex-col rounded">
        <div className="w-full flex items-center gap-1">
          <Input
            onChange={onChangeContentEventsComments}
            value={contentEventsComments}
            placeholder="Exemple"
            className="w-full p-3 rounded border border-zinc-500 border-opacity-20 bg-white bg-opacity-50 outline-none"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={createEventsComments}
            className="w-14 flex items-center justify-center h-12 bg-cyan-500 rounded text-white "
          >
            <BsFillSendFill />
          </motion.button>
        </div>
        <div className="flex flex-col mt-2 gap-1 w-full flex-1 max-h-[30rem] overflow-auto">
          {event?.comments?.map((item: any, index: any) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index / 10 }}
              key={index}
              className="flex flex-col gap-2 bg-gray-400 bg-opacity-10 border border-zinc-300 border-opacity-10 opacity-80 hover:opacity-100 justify-center p-3 pl-4 relative min-h-auto"
            >
              <div className="flex min-h-auto">
                {moment
                  .tz(item.createdAt, "America/Sao_Paulo")
                  .format("MM/DD - HH[h]mm")}
              </div>

              <div className="flex w-full">
                <span className="bg-cyan-600 h-full w-1 absolute top-0 left-0" />
                <div className="flex-1 flex text-justify">{item.content}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </form>
  );
}
