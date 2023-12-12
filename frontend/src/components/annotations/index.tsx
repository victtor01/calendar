"use client";

import * as S from "./style";

import { TbSubtask } from "react-icons/tb";
import { motion } from "framer-motion";

export function Annotations() {
  return (
    <S.Annotations className="flex m-1 rounded gap-2 flex-col relative p-3 w-full max-w-[15rem] mx-auto flex hover:shadow-xl transition-shadow">
      <S.Bubble />
      <header className="flex items-center gap-3 justify-between">
        <TbSubtask />
        <h1 className="font-semibold">Anotações</h1>
      </header>
      <section>
        <motion.button 
        whileTap={{ scale: 0.93 }}
        className="border-2 w-full p-2 px-3 border-zinc-400 border-opacity-30 opacity-80 hover:opacity-100 rounded-md border-dashed">
          <span className="flex justify-center items-center text-md text-zinc-500 font-semibold">
            Adicionar anotação
          </span>
        </motion.button>
      </section>
    </S.Annotations>
  );
}
