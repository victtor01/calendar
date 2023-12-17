"use client";

import { Annotation } from "@/types/annotations";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function useFormAnnotations() {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const handleOpenInput = (): void => setOpenInput((prev) => !prev);

  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  async function addAnnotation(): Promise<void> {}

  return {
    utils: {
      addAnnotation,
    },
    input: {
      handleOpenInput,
      openInput,
    },
  };
}

export function FormAnnotations() {
  const {
    utils: { addAnnotation },
    input: { handleOpenInput, openInput },
  } = useFormAnnotations();

  return (
    <form className="flex flex-col gap-3">
      <header className="items-center flex ">
        {!openInput && (
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
        )}
        {openInput && (
          <section className="flex flex-col gap-2 flex-1">
            <header className="flex justify-between items-center">
              <div className="flex flex-1">Create Annotation</div>
              <div>
                <button>
                  <IoClose />
                </button>
              </div>
            </header>
            <section className="flex flex-1">
              <textarea className="flex p-2 flex-1 bg-zinc-100 rounded resize-none outline-none dark:bg-gray-800" />
            </section>
            <footer className="flex-1">
              <button className="bg-cyan-500 opacity-80 hover:opacity-100 p-1 px-3 rounded text-sm">
                Criar
              </button>
            </footer>
          </section>
        )}
      </header>
    </form>
  );
}
