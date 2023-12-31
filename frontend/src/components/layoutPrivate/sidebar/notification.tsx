'use client'

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdNotificationsOutline } from "react-icons/io";

export function NotificationComponent() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex">
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="flex relative bg-blue-50 dark:bg-zinc-800 shadow transition-shadow hover:shadow-xl p-3 rounded-full"
      >
        <div className="opacity-80 hover:opacity-100 relative">
          <span className="bg-cyan-500 rounded-full absolute w-2 h-2 top-0 right-0" />
          <IoMdNotificationsOutline size="21" />
        </div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            key="modal-notification"
            className="shadow flex w-full z-40  min-w-[12rem] gap-3 flex-col absolute p-3 left-[100%] top-0 rounded-md ml-3 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 bg-white"
          >
            <header className="flex">
              <h2>Notificações</h2>
            </header>
            <section className="flex text-sm">Nenhum notificação</section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
