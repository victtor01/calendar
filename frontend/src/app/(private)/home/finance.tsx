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
} from "recharts";
import * as S from "./style";
import { fontOpenSans } from "@/app/fonts";

const data = [
  { id: 1, value: 100, date: moment().format("YYYY-MM-DD"), despesa: 34 },
  {
    id: 2,
    value: 120,
    date: moment().add(1, "days").format("YYYY-MM-DD"),
    despesa: 69,
  },
  {
    id: 3,
    value: 90,
    date: moment().add(2, "days").format("YYYY-MM-DD"),
    despesa: 57,
  },
];

export default function Finance() {
  return (
    <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
      <S.TitleComponent>
        <div className={`font-semibold opacity-70 ${fontOpenSans}`}>
          Entrada e saída de capital
        </div>
        <div className="text-cyan-300">22.3%</div>
      </S.TitleComponent>

      <ResponsiveContainer width="98%" height="100%" className="m-auto">
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
          <Area
            /* type={"monotone"} */
            dataKey="value"
            stroke="#64C9F3"
            fill="url(#color)"
          />
          <Area
            /* type={"monotone"} */
            dataKey="despesa"
            stroke="#ff3300"
            fill="url(#color-despesa)"
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            opacity={0.8}
            height={30}
            padding={"gap"}
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            tickCount={8}
            width={70}
            className="bg-red-200"
            tickFormatter={(number) => `${number.toFixed(2)}`}
            opacity={0.8}
          />
          <Tooltip />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
