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

const data: any = [];
for (let i = 1; i < 10; i++) {
  data.push({
    id: i,
    name: `client-${i}`,
    value: Math.floor(Math.random() * (100 - 5) + 5),
  });
}

export function TopClients() {
  return (
    <div className="flex flex-1 p-3 rounded-md w-[100%] flex-col z-40 backdrop-blur-xl">
      <S.TitleComponent>
        <div>Teste</div>
        <div>25.3%</div>
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
