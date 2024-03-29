"use client";

import { motion } from "framer-motion";
import * as S from "./style";
import { fontOpenSans } from "@/app/fonts";
import { FaUser } from "react-icons/fa";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import moment from "moment-timezone";
import { Clients } from "@/types/clients";

function useNewClients() {
  const api = useApiPrivate();

  const today = moment();
  const start = moment().startOf("month").format("MM-DD-YYYY");
  const end = moment().endOf("month").format("MM-DD-YYYY");

  const { data: clients, isLoading: loadingClients } = useQuery({
    queryKey: ["clients", "find-by-month"],
    queryFn: async (): Promise<Clients[]> => {
      return (await api.get(`/clients/find-by-date/${start}/${end}/`)).data;
    },
  });

  const { data: clientsLastMonth, isLoading: loadingClientsLastMonth } =
    useQuery({
      queryKey: ["clients", "lastMonth"],
      queryFn: async () => {
        return (
          await api.get(
            "/clients/find-by-date/" +
              today
                .clone()
                .subtract(1, "months")
                .startOf("month")
                .format("MM-DD-YYYY") +
              "/" +
              today
                .clone()
                .subtract(1, "months")
                .endOf("month")
                .format("MM-DD-YYYY")
          )
        ).data;
      },
    });

  const porcetage = (() => {
    const totalClientsToMonth = clients?.length || 0;
    const totalClientsLastMonth = clientsLastMonth?.length || 0;

    if (totalClientsToMonth === 0) {
      return -100;
    }

    if (totalClientsLastMonth === 0) {
      return 100;
    }

    return (
      ((totalClientsToMonth - totalClientsLastMonth) /
        Math.abs(totalClientsLastMonth)) *
      100
    );
  })();

  return {
    data: {
      clients,
    },
    loading: {
      loadingClients,
    },
    utils: {
      porcetage,
    },
  };
}

export default function NewClients() {
  const {
    data: { clients },
    loading: { loadingClients },
    utils: { porcetage },
  } = useNewClients();

  if (loadingClients) return <Loading />;
  return (
    <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
      <S.TitleComponent>
        <div className={`font-semibold opacity-70 ${fontOpenSans}`}>
          Clientes
        </div>
        <div className={porcetage >= 0 ? "text-cyan-300" : "text-rose-600"}>{porcetage.toFixed(2)}%</div>
      </S.TitleComponent>
      <S.ContentComponent>
        <div className="flex flex-col gap-1 p-2">
          <FaUser size="22" className="text-cyan-500" />
          <span className="text-lg font-semibold">{clients?.length}</span>
          <p className="text-sm text-cyan-500">Clientes novos</p>
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
              className={porcetage >= 0 ? "stroke-cyan-400" : "stroke-red-400"}
            />
            <S.Progress
              initial={{ pathLength: 0 }}
              animate={{ pathLength: porcetage >= 0 ? porcetage / 100 : (Math.abs(porcetage) / 100), }}
              transition={{
                duration: 2,
                delay: 0.2,
                type: "spring",
              }}
              cx="50"
              cy="60"
              r="30"
              pathLength="1"
              className={"relative " + (porcetage >= 0 ? "stroke-cyan-500" : "stroke-rose-600")}
            ></S.Progress>
          </svg>
        </div>
      </S.ContentComponent>
    </motion.div>
  );
}
