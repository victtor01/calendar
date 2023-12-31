"use client";

import { IoAddSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import * as S from "../style";

//components
import { TemplateDialog } from "./template";
import { Links } from "./links";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "linear", duration: 0.3 }}
      className="flex min-h-auto z-[2] w-auto bg-blue-100 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-50 justify-between items-center relative m-1 rounded-xl"
    >
      <S.Bubble className="overflow-hidden rounded-xl" />
      <header className=" flex rounded-md items-center mx-auto">
        <div className="flex gap-2 relative mx-auto flex-1">
          <button className="h-14 w-14 px-4 flex justify-center items-center opacity-100 relative">
            <IoAddSharp size="23" />
          </button>

          <Links />

          <TemplateDialog />
        </div>
      </header>
    </motion.div>
  );
}
