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

function useTopClients() {
  const api = useApiPrivate();

  const today = moment();
  const start = moment().startOf("month").format("MM-DD-YYYY");
  const end = moment().endOf("month").format("MM-DD-YYYY");

  const { data: clients, isLoading: loadingClients } = useQuery({
    queryKey: ["clients", "top-10-clients"],
    queryFn: async (): Promise<Clients[]> => {
      return (await api.get(`/clients/top-10-clients`)).data;
    },
  });

  return {
    clients,
    loadingClients,
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-700 backdrop-blur-xl flex p-3 flex-col shadow-md rounded">
        <div className={`justify-center items-center `}>{label}</div>
        <p className="text-gray-700 dark:text-gray-200">
          valor: {`${convertToRealMoney.format(payload[0].value)}`}
        </p>
      </div>
    );
  }

  return null;
};

export function TopClients() {
  const { clients, loadingClients } = useTopClients();

  if (loadingClients) {
    return "Carregandos clientes...";
  }

  const data = clients?.map((client) => ({
    name: client?.firstName,
    value: client?.events?.length || 0,
  }));

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
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" fill="url(#color)" radius={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
