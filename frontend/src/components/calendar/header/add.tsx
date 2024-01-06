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
        className="h-12 w-12 px-4 rounded-2xl flex justify-center transition-background items-center opacity-100 relative hover:bg-indigo-500 hover:dark:bg-indigo-700 hover:text-white"
      >
        <IoAddSharp size="20" />
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
