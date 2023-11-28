"use client";

import { fontOpenSans } from "@/app/fonts";
import * as S from "./style";
import { motion } from "framer-motion";
import { FaArrowTrendUp } from "react-icons/fa6";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { Register } from "@/types/registers";
import Loading from "@/components/loading";
import moment from "moment-timezone";

const useResumeFinance = () => {
  const api = useApiPrivate();

  const start = moment().startOf("month").format("MM-DD-YYYY");
  const end = moment().endOf("month").format("MM-DD-YYYY");

  const { data: registers, isLoading: loadingRegisters } = useQuery({
    queryKey: ["registers", "date"],
    queryFn: async (): Promise<Register[]> => {
      return (await api.get(`/registers/find/date/${start}/${end}`)).data;
    },
  });

  const profit = (() => {
    const income =
      registers
        ?.filter((item: Register) => item.type === "INCOME")
        .reduce((acc: number, item: Register) => {
          return acc + item.value;
        }, 0) || 0;

    const expense =
      registers
        ?.filter((item: Register) => item.type === "EXPENSE")
        .reduce((acc: number, item: Register) => {
          return acc + item.value;
        }, 0) || 0;

    return income - expense;
  })();

  return {
    profit,
    loadingRegisters,
  };
};

export default function ResumeFinance() {
  const { profit, loadingRegisters } = useResumeFinance();

  if (loadingRegisters) return <Loading />;
  console.log(profit);
  return (
    <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
      <S.TitleComponent>
        <div className={`font-semibold opacity-70 ${fontOpenSans}`}>Lucro</div>
        <div className="text-cyan-300">5%</div>
      </S.TitleComponent>
      <S.ContentComponent>
        <div className="flex flex-col gap-1 p-2">
          <FaArrowTrendUp size="22" className="text-cyan-500" />
          <span className="text-xl font-semibold">
            {convertToRealMoney.format(profit)}
          </span>
          <p className="text-sm text-cyan-500">
            Lucro esse Mês 
          </p>
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
              cy="60"
              r="30"
              pathLength="1"
              className="stroke-cyan-400"
            />
            <S.Progress
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.6 }}
              transition={{
                duration: 2,
                delay: 0.2,
                type: "spring",
              }}
              cx="50"
              cy="60"
              r="30"
              pathLength="1"
              className="stroke-cyan-500 relative"
            ></S.Progress>
          </svg>
        </div>
      </S.ContentComponent>
    </motion.div>
  );
}
