"use client";

import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import useApiPrivate from "@/hooks/apiPrivate";
import { Register } from "@/types/registers";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-timezone";
import { Line, LineChart, ResponsiveContainer } from "recharts";

function useIncome() {
  const api = useApiPrivate();

  const start = moment().subtract(30, "days").format("MM-DD-YYYY");
  const end = moment().format("MM-DD-YYYY");

  const { data: registers } = useQuery({
    queryKey: ["registers", "thirtyDaysAgo"],
    queryFn: async (): Promise<Register[]> => {
      return (await api.get(`/registers/find/date/${start}/${end}`)).data;
    },
  });

  return { registers };
}

export function Income() {
  const { registers } = useIncome();

  const incomes = registers?.filter((register) => register.type === "INCOME");
  
  const incomesToDay = incomes
    ?.filter((register) => {
      return (
        moment(register.createdAt).format("DD-MM-YYYY") ===
        moment().format("DD-MM-YYYY")
      );
    })
    ?.map((register) => register.value)
    .reduce((acc, value) => {
      return acc + value;
    }, 0);

  return (
    <div className="flex flex-col relative gap-3 overflow-hidden w-full h-[10rem] bg-gradient-45 from-neutral-950 border dark:border-zinc-800 to-zinc-950 rounded-xl hover:shadow-xl">
      <ResponsiveContainer width="100%" height="80%">
        <LineChart width={500} height={300} data={incomes} margin={{ top: 20, bottom: 20 }}>
          <Line
            type="monotone"
            dot={false}
            dataKey="value"
            stroke="#4F46E5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 p-3 h-full flex items-end w-full ">
        <span className="text-xl font-semibold text-zinc-200">
          {convertToRealMoney.format(Number(incomesToDay))} Hoje
        </span>
      </div>
    </div>
  );
}
