"use client";

import { motion } from "framer-motion";
import { fontOpenSans } from "@/app/fonts";
import { FaBriefcase } from "react-icons/fa";
import * as S from "./style";

export default function NewServices() {
  return (
    <motion.div
      className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl"
    >
      <S.TitleComponent>
        <div className={`font-semibold opacity-70 ${fontOpenSans}`}>
          Serviços
        </div>
        <div className="text-cyan-300">25.3%</div>
      </S.TitleComponent>
      <S.ContentComponent>
        <div className="flex flex-col gap-1 p-2">
          <FaBriefcase size="22" className="text-cyan-500" />
          <span className="text-xl font-semibold">120</span>
          <p className="text-sm text-cyan-500">Serviços esse mês</p>
        </div>
        <div className="relative items-center justify-center flex">
          <svg
            className="rotate-[-90deg]"
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <S.Circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="stroke-cyan-400"
            />
            <S.Progress
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.63 }}
              transition={{
                duration: 2,
                delay: 0.2,
                type: "spring",
              }}
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="stroke-cyan-500 relative"
            ></S.Progress>
          </svg>
          <span className="p-2 absolute font-semibold opacity-70 text-cyan-600">
            63%
          </span>
        </div>
      </S.ContentComponent>
    </motion.div>
  );
}
