"use client";

import { Event, StatusEvent } from "@/types/events";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Modal from "../modal";
import { fontInter } from "@/app/fonts";
import { Service } from "@/types/services";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import Label from "../label";
import { Clients } from "@/types/clients";
import * as S from "./style";
import { Delete } from "./delete";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import Finish from "./finish";

interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  if(!event) {
    return (
      <div className="text-xl font-semibold">
        Nenhum evento, tente novamente mais tarde!
      </div>
    )
  }

  return (
    <div className="flex gap-3 items-center justify-end">
      <Delete event={event} />

      <Button className="flex opacity-60 hover:bg-zinc-500 hover:bg-opacity-20 items-center  justify-center rounded-full w-10 h-10">
        <BiArchiveIn size="20" />
      </Button>

      <Finish event={event} />
    </div>
  );
}
