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
  createdAt: string;
  quantity: number;
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
  const daysInMonth = moment().month(start).daysInMonth();

  const { data: allClients, isLoading: loadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async (): Promise<Clients[]> => {
      return (await api.get(`/clients/find-by-date/${start}/${end}/`)).data;
    },
  });

  const clients = (() => {
    const data: ClientsMonthPayloadprops[] = [];
    allClients?.forEach((item: Clients) => {
      const day = moment(item.createdAt).format("DD/MM");

      const existingIndex = data.findIndex(
        (entry) => moment(entry.createdAt, "DD/MM").format("DD/MM") === day
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

    const month = moment().month() + 1;
    for (let i = 1; i <= Number(daysInMonth); i++) {
      const exists = data.filter((item: ClientsMonthPayloadprops) => {
        return (
          moment(item.createdAt, "DD/MM").format("DD/MM") ===
          moment(`${i}/${month}`, "DD/MM").format("DD/MM")
        );
      });

      if (!exists || !exists.length) {
        data.push({
          createdAt: `${i}/${month}`,
          quantity: 0,
        });
      }
    }

    data.sort((a, b) => {
      const [dayA, monthA] = a.createdAt.split("/").map(Number);
      const [dayB, monthB] = b.createdAt.split("/").map(Number);

      // Comparar primeiro pelo mês e, em seguida, pelo dia
      if (monthA !== monthB) {
        return monthA - monthB;
      }

      return dayA - dayB;
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
          <h2>Quantidade de clientes no mês de {moment().format('MMMM [de] YYYY')}</h2>
          <div className="text-cyan-300 text-xl">22.3%</div>
        </div>
      </S.TitleComponent>
      <ResponsiveContainer width="99%" height="100%">
        <LineChart width={300} height={100} data={clients}>
          <Line
            type="monotone"
            dataKey="quantity"
            stroke="#06b6d4"
            strokeWidth={3}
            legendType="diamond"
            dot={false}
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
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
