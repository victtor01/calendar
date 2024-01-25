"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as S from "./style";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { Clients } from "@/types/clients";

const data: any = [];
for (let i = 1; i < 10; i++) {
  data.push({
    id: i,
    name: `client-${i}`,
    value: Math.floor(Math.random() * (100 - 5) + 5),
  });
}

function useTopClients() {
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

  return {
    clients,
    loadingClients,
  };
}

export function TopClients() {
  const { clients, loadingClients } = useTopClients();

  if (loadingClients) {
    return "Carregandos clientes...";
  }

  const sortedArrayX =
    clients?.sort(
      (a, b) => (a?.events?.length || 0) - (b?.events?.length || 0)
    ) || [];

  console.log("a: ", sortedArrayX);

  const top10ArrayX = sortedArrayX.slice(0, 10);
  console.log(top10ArrayX);

  return (
    <div className="flex flex-1 p-2 rounded-md w-[100%] flex-col z-40 backdrop-blur-xl">
      <S.TitleComponent>
        <div className=" text-gray-700 font-bold dark:text-gray-400">
          Top 10 clientes no mês de {moment().format("MMM [de] YYYY")}
        </div>
      </S.TitleComponent>
      <ResponsiveContainer width={"99%"} height={"99%"}>
        <BarChart width={730} height={250} data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64C9F3" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#64C9F3" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} opacity={0.1} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            opacity={0.8}
            height={30}
            padding={"gap"}
            tickMargin={10}
            minTickGap={5}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={8}
            width={100}
            tickFormatter={(number) => `${convertToRealMoney.format(number)}`}
            opacity={0.8}
            tickMargin={10}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" fill="url(#color)" radius={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
