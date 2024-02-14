"use client";

import { motion } from "framer-motion";
import { fontOpenSans } from "@/app/fonts";
import { FaBriefcase } from "react-icons/fa";
import * as S from "./style";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import { Service } from "@/types/services";
import Link from "next/link";
import { BiRightArrow } from "react-icons/bi";
import { BsArrowRightSquareFill } from "react-icons/bs";

function useServices() {
  const api = useApiPrivate();

  const { data: services, isLoading: loadingServices } = useQuery<Service[]>({
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
    <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl relative">
      <S.TitleComponent>
        <div className={`font-semibold opacity-70 ${fontOpenSans}`}>
          Serviços
        </div>
        <Link
          href={"/services"}
          className="flex gap-3 items-center transition-[gap] hover:gap-4 font-semibold text-gray-800 dark:text-gray-200  opacity-70 hover:opacity-100"
        >
          Ver mais
          <span className="text-black dark:text-white">
            <BsArrowRightSquareFill size="20" />
          </span>
        </Link>
      </S.TitleComponent>
      <S.ContentComponent>
        <div className="flex flex-col gap-1 p-2">
          <FaBriefcase size="22" className="text-cyan-500" />
          <span className="text-lg font-semibold">{services?.length}</span>
          <p className="text-sm text-cyan-500">Serviços cadastrados</p>
        </div>
      </S.ContentComponent>
    </motion.div>
  );
}
