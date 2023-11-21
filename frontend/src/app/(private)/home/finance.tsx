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
import { fontOpenSans } from "@/app/fonts";

const data = [
  { id: 1, value: 100, date: moment().format("YYYY-MM-DD"), despesa: 34 },
  {
    id: 2,
    value: 150,
    date: moment().add(1, "days").format("YYYY-MM-DD"),
    despesa: 120,
  },
  {
    id: 3,
    value: 90,
    date: moment().add(2, "days").format("YYYY-MM-DD"),
    despesa: 57,
  },
  {
    id: 3,
    value: 150,
    date: moment().add(3, "days").format("YYYY-MM-DD"),
    despesa: 65,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip backdrop-blur-xl flex p-3 flex-col shadow-md bg-zinc-700 bg-opacity-5">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function Finance() {
  return (
    <motion.div className="flex flex-1 p-3 ounded-md flex-col z-40 backdrop-blur-xl">
      <S.TitleComponent>
        <div
          className={`font-semibold opacity-70 p-2 flex-col ${fontOpenSans}`}
        >
          <h2>Entrada e saída de capital</h2>
          <div className="text-cyan-300 text-xl">22.3%</div>
        </div>
      </S.TitleComponent>
      <ResponsiveContainer height="100%" className="m-auto">
        <AreaChart data={data} className="overflow-visible">
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64C9F3" stopOpacity="0.4" />
              <stop offset="200%" stopColor="#64C9F3" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="color-despesa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#db1111" stopOpacity="0.4" />
              <stop offset="200%" stopColor="#db1111" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke="#64C9F3" fill="url(#color)" />
          <Area dataKey="despesa" stroke="#ff3300" fill="url(#color-despesa)" />
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
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            width={70}
            className="bg-red-200"
            tickFormatter={(number) => `${number.toFixed(2)}`}
            opacity={0.8}
            tickMargin={10}
          />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
