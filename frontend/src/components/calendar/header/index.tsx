"use client";

import { motion } from "framer-motion";
import * as S from "../style";

//components
import { TemplateDialog } from "./template";
import { Links } from "./links";
import Add from "./add";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "linear", duration: 0.3 }}
      className="flex min-h-auto  z-30  w-auto  justify-between items-center relative rounded-lg my-2"
    >
      <header className=" flex  rounded-md items-center mx-auto relative">
        <S.Bubble />

        <div className="flex gap-2  relative mx-auto flex-1 items-center rounded-xl bg-white dark:bg-zinc-900 p-2">
          <Add />

          <Links />

          <TemplateDialog />
        </div>
      </header>
    </motion.div>
  );
}
