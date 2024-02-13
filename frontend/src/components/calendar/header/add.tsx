"use client";

import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import AddClient from "../create";
import { AnimatePresence } from "framer-motion";

export default function Add() {
  const [selectedDay, setSelectedDay] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  return (
    <>
      <button
        onClick={() => {
          setSelectedDay({
            start: new Date(),
            end: new Date(),
          });
        }}
        className={`h-12 w-auto px-4 gap-2 text-md font-semibold capitalize flex justify-center transition-background items-center opacity-80 hover:opacity-100  relative hover:bg-zinc-800`}
      >
        <IoAddSharp size="20" />
        Criar
      </button>

      <AnimatePresence>
        {selectedDay?.start && (
          <AddClient
            setSelectedDay={setSelectedDay}
            selectedDay={selectedDay}
          />
        )}
      </AnimatePresence>
    </>
  );
}
