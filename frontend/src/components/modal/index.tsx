"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import * as S from "./style";

interface ModalProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export default function Modal({ children, ...props }: ModalProps) {
  const { className, ...rest } = props;
  return (
    <motion.div
      className={
        "z-[100] w-full h-screen overflow-y-auto fixed bg-black flex bg-opacity-30 top-0 left-0"
      }
    >
      <S.Modal
        {...rest}
        className={twMerge(
          "w-full max-w-[40rem] m-auto p-2 bg-white rounded dark:bg-gray-950",
          className
        )}
      >
        {children}
      </S.Modal>
    </motion.div>
  );
}
