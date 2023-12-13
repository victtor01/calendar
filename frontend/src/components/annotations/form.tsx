"use client";

import { Annotation } from "@/types/annotations";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

function useFormAnnotations() {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const handleOpenInput = (): void => setOpenInput((prev) => !prev);
  
  const [annotations, setAnnotations] = useState<Annotation[]>([])

  async function addAnnotation (): Promise<void> {

  }

  return {
    input: {
      handleOpenInput,
      openInput,
    },
  };
}

export function FormAnnotations() {
  const {
    input: { handleOpenInput, openInput },
  } = useFormAnnotations();

  return (
    <form className="flex flex-col gap-3">
      <header className="items-center flex ">
        <motion.button
          onClick={handleOpenInput}
          type="button"
          whileTap={{ scale: 0.93 }}
          className="border-2 w-full p-2 px-3 border-zinc-400 border-opacity-30 opacity-80 hover:opacity-100 rounded-md border-dashed"
        >
          <span className="flex justify-center items-center text-md text-zinc-500 font-semibold">
            Adicionar anotação
          </span>
        </motion.button>
      </header>
      <AnimatePresence>
        {openInput && (
          <motion.div
            key={"input"}
            exit={{ opacity: 0, height: 0, padding: "0" }}
            initial={{ opacity: 0, height: 0, padding: "0" }}
            transition={{ type: "spring" }}
            animate={{
              opacity: 1,
              height: "3rem",
              
            }}
            className="flex gap-2 items-center w-full"
          >
            <motion.input
              placeholder="Lembre-me mais tarde..."
              className="bg-zinc-500 bg-opacity-10 outline-none shadow transition-shadow focus:shadow-xl p-3 w-full rounded"
            />
            <motion.button
              whileTap={{ scale: 0.93 }}
              className="center w-14 h-10 grid place-content-center bg-gradient-45 from-purple-500 to-cyan-500 rounded opacity-50 hover:opacity-100"
            >
              <FaCheck />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
