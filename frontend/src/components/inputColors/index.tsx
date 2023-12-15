"use client";

import { motion } from "framer-motion";

interface InputColorsProps {
  colors: string[];
  handle: (color: string) => void;
}

export const InputColors = ({ colors, handle }: InputColorsProps) => {
  return (
    <div className="flex gap-2">
      {colors?.map((color: string) => {
        return (
          <motion.button
            key={color}
            onClick={() => handle(color)}
            type="button"
            whileTap={{ scale: 0.94 }}
            className="p-3 rounded-full border border-zinc-500 border-opacity-20"
            style={{
              background: color,
            }}
          />
        );
      })}
    </div>
  );
};
