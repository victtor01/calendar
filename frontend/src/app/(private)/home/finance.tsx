"use client";

import moment from "moment-timezone";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import * as S from "./style";
import { fontOpenSans, fontValela } from "@/app/fonts";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import { RegisterType } from "@/types/registers";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <S.Theme className="custom-tooltip backdrop-blur-xl flex p-3 flex-col shadow-md bg-zinc-700 bg-opacity-5">
        <div className={`justify-center items-center ${fontValela} `}>
          {label}
        </div>
        <p className="text-emerald-500">
          Entrada: {`${convertToRealMoney.format(payload[0].value)}`}
        </p>
        <p className="text-rose-500">
          Saída: {`${convertToRealMoney.format(payload[1].value)}`}
        </p>
        <p className="text-purple-600 font-semibold">
          Total: {`${convertToRealMoney.format(payload[0].value - payload[1].value)}`}
        </p>
      </S.Theme>
    );
  }

  return null;
};

interface Sumary {
  createdAt: Date;
  type: RegisterType;
  _sum: { value: number };
}

interface dataSumary {
  date: string;
  income: number;
  expense: number;
}

function useFinance() {
  const api = useApiPrivate();

  const start = moment().startOf("month").format("MM/DD/YYYY");
  const end = moment().endOf("month").format("MM/DD/YYYY");
  const daysInMonth = moment().month(start).daysInMonth();

  const { data: finance, isLoading } = useQuery<Sumary[]>({
    queryKey: ["registers", "sumary"],
    queryFn: async () => {
      return (
        await api.post("/registers/find/sumary-by-date", {
          start,
          end,
        })
      ).data;
    },
  });

  const registers = (() => {
    if (!finance) return;

    const data: dataSumary[] = [];

    finance?.forEach((item: Sumary) => {
      const day = moment(item.createdAt).format("DD/MM");
      const itemSum = Number(item._sum.value) || 0;

      const existingIndex = data.findIndex(
        (entry) => moment(entry.date, "DD/MM").format("DD/MM") === day
      );

      if (existingIndex !== -1) {
        data[existingIndex].income += item.type === "INCOME" ? itemSum : 0;
        data[existingIndex].expense += item.type !== "INCOME" ? itemSum : 0;
      } else {
        const entry = {
          date: day,
          income: item.type === "INCOME" ? itemSum : 0,
          expense: item.type !== "INCOME" ? itemSum : 0,
        };
        data.push(entry);
      }
    });

    const month = moment().month() + 1;
    for (let i = 1; i <= Number(daysInMonth); i++) {
      const exists = data.filter((item: dataSumary) => {
        return (
          moment(item.date, "DD/MM").format("DD/MM") ===
          moment(`${i}/${month}`, 'DD/MM').format("DD/MM")
        );
      });

      if (!exists || !exists.length) {
        data.push({
          date: `${i}/${month}`,
          income: 0,
          expense: 0,
        });
      }
    }

    data.sort((a, b) => {
      const [dayA, monthA] = a.date.split('/').map(Number);
      const [dayB, monthB] = b.date.split('/').map(Number);
    
      if (monthA !== monthB) {
        return monthA - monthB;
      }
    
      return dayA - dayB;
    });

    return data;
  })();

  return {
    finance,
    registers,
    isLoading,
  };
}

export default function Finance() {
  const { finance, registers, isLoading } = useFinance();

  if (isLoading) return <Loading />;

  return (
    <>
      <S.TitleComponent>
        <div
          className={`font-semibold opacity-70 p-2 flex-col ${fontOpenSans}`}
        >
          <h2>Entrada e saída de capital no mês de {moment().format('MMMM [de] YYYY')}</h2>
          <div className="text-cyan-300 text-xl">22.3%</div>
        </div>
      </S.TitleComponent>
      <ResponsiveContainer height="100%" width={"99%"} className="m-auto">
        <AreaChart data={registers} className="overflow-visible">
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64C9F3" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#64C9F3" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="color-despesa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#db1111" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#db1111" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <Area dataKey="income" stroke="#64C9F3" fill="url(#color)" />
          <Area dataKey="expense" stroke="#ff3300" fill="url(#color-despesa)" />
          <Tooltip content={<CustomTooltip />} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            opacity={0.8}
            height={30}
            padding={"gap"}
            tickMargin={10}
            minTickGap={5}
          />
          <Legend />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={8}
            width={100}
            tickFormatter={(number) => `${convertToRealMoney.format(number)}`}
            opacity={0.8}
            tickMargin={10}
          />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
