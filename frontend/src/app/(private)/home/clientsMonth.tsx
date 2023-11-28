"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import * as S from "./style";
import { fontOpenSans, fontValela } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { Clients } from "@/types/clients";
import moment from "moment-timezone";
import Loading from "@/components/loading";

interface ClientsMonthPayloadprops {
  createdAt: string,
  quantity: number,
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <S.Theme className="custom-tooltip backdrop-blur-xl flex p-3 flex-col shadow-md bg-zinc-700 bg-opacity-5">
        <div className={`justify-center items-center ${fontValela} `}>
          {label}
        </div>
        <p className="text-emerald-500">
          Qua. Clientes: {`${payload[0].value}`}
        </p>
      </S.Theme>
    );
  }

  return null;
};

const useClientsMonth = () => {
  const api = useApiPrivate();

  const start = moment().startOf("month").format("MM-DD-YYYY");
  const end = moment().endOf("month").format("MM-DD-YYYY");

  const { data: allClients, isLoading: loadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async (): Promise<Clients[]> => {
      return (await api.get(`/clients/find-by-date/${start}/${end}/`)).data;
    },
  });

  const clients = (() => {
    const data: ClientsMonthPayloadprops[] = [];
    allClients?.forEach((item: Clients) => {
      const day = moment(item.createdAt).format("DD/MM/YYYY");

      const existingIndex = data.findIndex(
        (entry) =>
          moment(entry.createdAt, "DD/MM/YYYY").format("DD/MM/YYYY") === day
      );

      if (existingIndex !== -1) {
        data[existingIndex].quantity++;
      } else {
        const entry = {
          createdAt: day,
          quantity: 1,
        };
        data.push(entry);
      }
    });

    return data;
  })();

  return {
    clients,
    loadingClients,
  };
};

export default function ClientsMonth() {
  const { clients, loadingClients } = useClientsMonth();
  if (loadingClients) return <Loading />;

  return (
    <>
      <S.TitleComponent>
        <div
          className={`font-semibold opacity-70 px-4 flex-col py-2 ${fontOpenSans}`}
        >
          <h2>Entrada e saída de capital</h2>
          <div className="text-cyan-300 text-xl">22.3%</div>
        </div>
      </S.TitleComponent>
      <ResponsiveContainer width="99%" height="100%">
        <LineChart width={300} height={100} data={clients}>
          <Line
            type="monotone"
            dataKey="quantity"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <YAxis
            dataKey="quantity"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            width={70}
            tickFormatter={(number) => `${number.toFixed(2)}`}
            opacity={0.8}
          />
          <XAxis
            dataKey="createdAt"
            axisLine={false}
            tickLine={false}
            opacity={0.8}
            height={30}
            padding={"gap"}
            tickMargin={10}
            minTickGap={5}
          />
          <Tooltip content={<CustomTooltip/>} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
