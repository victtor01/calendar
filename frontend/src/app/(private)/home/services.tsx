"use client";

import { motion } from "framer-motion";
import { fontOpenSans } from "@/app/fonts";
import { FaBriefcase } from "react-icons/fa";
import * as S from "./style";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import { Service } from "@/types/services";

function useServices() {
  const api = useApiPrivate();

  const { data: services, isLoading: loadingServices } = useQuery({
    queryKey: ["services"],
    queryFn: async (): Promise<Service[]> => {
      return (await api.get("/services")).data;
    },
  });

  return {
    services,
    loadingServices,
  };
}

export default function NewServices() {
  const { services, loadingServices } = useServices();
  if (loadingServices || !services) return <Loading />;

  return (
    <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
      <S.TitleComponent>
        <div className={`font-semibold opacity-70 ${fontOpenSans}`}>
          Serviços
        </div>
      </S.TitleComponent>
      <S.ContentComponent>
        <div className="flex flex-col gap-1 p-2">
          <FaBriefcase size="22" className="text-cyan-500" />
          <span className="text-lg font-semibold">{services?.length}</span>
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
        </div>
      </S.ContentComponent>
    </motion.div>
  );
}
