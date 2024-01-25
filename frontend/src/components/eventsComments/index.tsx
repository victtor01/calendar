"use client";

import { fontRoboto } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { Event } from "@/types/events";
import { ChangeEvent, memo, useState } from "react";
import { BsFillSendFill, BsListNested } from "react-icons/bs";
import moment from "moment-timezone";
import { motion } from "framer-motion";
import { Comment } from "@/types/comment";

interface CommentsProps {
  event: Event;
}

function useComments({ event }: CommentsProps) {
  const api = useApiPrivate();

  const [contentEventsComments, setContentEventsComments] =
    useState<string>("");

  function onChangeContentEventsComments(e: ChangeEvent<HTMLInputElement>) {
    setContentEventsComments(e.target.value.toString());
  }

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

    queryClient.invalidateQueries(["event"]);
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
    <form className="flex flex-col max-w-[30rem] w-full gap-2  rounded-md relative">
      <div
        className={`rounded opacity-70 w-full h-10 flex px-6 pt-10 pb-4 items-center gap-3 ${fontRoboto}`}
      >
        <BsListNested size="18" />
        <h1 className="text-xl">Meus comentários</h1>
      </div>
      <div className="flex flex-1 w-full flex-col rounded">
        <div className="w-full flex items-center gap-1 px-6">
          <input
            onChange={onChangeContentEventsComments}
            value={contentEventsComments}
            placeholder="Exemple"
            className="w-full p-3 rounded shadow focus:shadow-md bg-zinc-500 bg-opacity-5 outline-none"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={createEventsComments}
            className="w-14 flex items-center justify-center h-12 bg-cyan-500 rounded text-white "
          >
            <BsFillSendFill />
          </motion.button>
        </div>
        <div className="flex flex-col mt-2 gap-1 px-6 w-full flex-1 h-auto overflow-y-auto overflow-x-hidden">
          {event?.comments?.map((item: Comment, index: any) => (
            <motion.button
              type="button"
              layout
              onClick={() => null}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index / 10 }}
              key={index}
              className="flex flex-col rounded gap-2 bg-zinc-300 z-10 bg-opacity-5 shadow hover:shadow-xl transition-shadow border border-zinc-300 border-opacity-10 opacity-80 hover:opacity-100 justify-center p-3 pl-4 relative min-h-auto"
            >
              <div className="flex min-h-auto">
                {moment
                  .tz(item.createdAt, "America/Sao_Paulo")
                  .format("MM/DD - HH[h]mm")}
              </div>
              <div className="flex w-full">
                <div className="flex-1 flex text-justify">{item.content}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </form>
  );
}