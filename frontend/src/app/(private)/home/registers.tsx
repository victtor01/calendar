"use client";

import { motion } from "framer-motion";
import * as S from "./style";
import { fontValela } from "@/app/fonts";
import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "@/hooks/apiPrivate";
import Loading from "@/components/loading";
import { Register } from "@/types/registers";
import moment from "moment-timezone";

moment.tz.setDefault("America/Sao_Paulo");

function useRegisters() {
  const api = useApiPrivate();

  const { data: registers, isLoading: loadingRegisters } = useQuery({
    queryKey: ["registers-page", "registers"],
    queryFn: async (): Promise<Register[]> => {
      return (await api.get("/registers/page/1")).data.registers;
    },
  });

  return {
    data: {
      registers,
    },
    loading: {
      loadingRegisters,
    },
  };
}

export default function Registers() {
  const {
    data: { registers },
    loading: { loadingRegisters },
  } = useRegisters();

  if (loadingRegisters) {
    return <Loading />;
  }

  return (
    <motion.div className="flex w-full relative flex-col flex-1 z-[10] min-w-[20rem]">
      <S.ComponentRegister
        style={{ background: "transparent" }}
        className={`${fontValela} p-2 sticky top-0 backdrop-blur-md`}
      >
        Transições recentes
      </S.ComponentRegister>
      {registers?.map((item: Register, index: number) => {
        const className =
          item.type === "INCOME"
            ? "bg-emerald-500 text-emerald-500"
            : "bg-rose-500 text-rose-700";
        return (
          <S.ComponentRegister
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index / 6,
              type: "spring",
              duration: 0.6,
            }}
            className={`p-2 items-center flex justify-between`}
          >
            <div className="flex-1">{item.name}</div>
            <div className="flex-1">
              {moment(item.createdAt).tz("America/Sao_Paulo").fromNow()}
            </div>
            <div
              className={` p-2 w-auto min-w-[5rem] flex justify-center bg-opacity-20 text-xs rounded font-semibold ${className}`}
            >
              {item.type === "INCOME" ? "+" : "-"} R$ {item.value}
            </div>
          </S.ComponentRegister>
        );
      })}
    </motion.div>
  );
}
