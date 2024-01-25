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
      className="relative top-0 bg-white dark:bg-zinc-900 mx-auto p-2 rounded-xl dark:bg-opacity-50 flex w-full shadow hover:shadow-md my-3 transition-shadow items-center gap-2 justify-center"
    >
      <S.Bubble />

      <Add />

      <Links />

      <TemplateDialog />
    </motion.div>
  );
}
