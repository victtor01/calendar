"use client";

import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import * as S from "./style";
import { GoGear } from "react-icons/go";
import { BiExit, BiPen } from "react-icons/bi";
import { useState } from "react";
import { useSessionContext } from "@/contexts/sessionContext";

export const Plan = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { userInfo } = useSessionContext();

  return (
    <div className="bg-blue-50 dark:bg-zinc-800 rounded-md flex gap-1 w-full justify-between items-center relative  opacity-80 dark:opacity-60 hover:dark:opacity-100 hover:opacity-100">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer  opacity-80 transition-opacity hover:opacity-100  justify-between  items-center rounded flex p-3 w-full"
      >
        <div className="flex flex-col ">
          <span className="text-md capitalize">{userInfo?.firstName}</span>
          <span className="text-xs">{userInfo.email}</span>
        </div>
        <motion.button
          animate={{
            rotate: open ? "90deg" : "0deg",
          }}
          whileTap={{ scale: 0.94 }}
          className="flex bg-transparent p-2 rounded "
        >
          <IoIosArrowUp size={20} />
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              key="modal-notification"
              className="flex w-full min-w-[12rem] z-30  gap-3 flex-col absolute p-4 left-[100%] top-0 rounded-md ml-3 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 bg-white"
            >
              <header className="flex flex-col ">
                <div className="text-xs flex">
                  <div>{userInfo?.firstName}</div>
                  <div>{userInfo?.lastName}</div>
                </div>
                <p className="text-xs opacity-80">{userInfo?.email}</p>
              </header>
              <S.Separator />
              <section className="flex flex-col gap-3 text-sm">
                <motion.button className="flex gap-2 opacity-80 hover:opacity-100 items-center">
                  <GoGear size="18" />
                  <span className="text-sm font-light">Configurações</span>
                </motion.button>
                <motion.button className="flex gap-2 opacity-80 hover:opacity-100 items-center">
                  <BiPen size="18" />
                  <span className="text-sm font-light">Editar conta</span>
                </motion.button>
                <motion.button className="flex gap-2 opacity-80 hover:opacity-100 items-center">
                  <BiExit size="18" />
                  <span className="text-sm font-light">Logout</span>
                </motion.button>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
