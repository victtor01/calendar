import { fontRoboto } from "@/app/fonts";
import Todo from "@/components/todo";
import { Server } from "@/constants/server";
import { useSessionContext } from "@/contexts/sessionContext";
import Image from "next/image";
import { GoGear } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const data: any = [];
for (let i = 0; i < 10; i++) {
  data.push({
    name: `name-[i]`,
    value: Math.floor(Math.random() * (100 - 0 + 1)) + 0,
  });
}

const Separator = () => (
  <span className="flex w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 dark:via-zinc-900 to-transparent" />
);

export default function Information() {
  const { userInfo } = useSessionContext();

  return (
    <div
      style={{ gridArea: "user" }}
      className="bg-transparent py-4 px-2 flex flex-col gap-4 w-[18rem] z-10"
    >
      <div className="flex flex-col gap-2">
        <header className="flex justify-between gap-20">
          <div className="bg-gradient-45 border-2 border-zinc-600 shadow-inner from-purple-600 to-blue-600 w-14 h-14 relative rounded-full overflow-hidden opacity-90">
            <Image
              src={`${Server}/uploads/${userInfo.photo}`}
              sizes="(max-width: 2rem) 2rem, 1200px"
              fill
              quality={100}
              style={{ objectFit: "cover" }}
              alt="Foto do usuario"
            />
          </div>
          <div className="flex gap-5 py-1">
            <GoGear size="20" />
            <IoClose size="20" />
          </div>
        </header>
        <section
          className={`flex flex-col text-gray-600 font-semibold dark:text-white gap-[-2rem] ${fontRoboto}`}
        >
          <h1 className="text-xl">{userInfo?.firstName}</h1>
          <p>{userInfo?.email}</p>
        </section>
      </div>

      <section className="gap-3 flex-col  rounded flex text-gray-800 dark:text-gray-300">
        <div className="flex flex-col h-auto hover:scale-[1.04] transition-all w-full bg-blue-50 rounded-xl  dark:bg-zinc-950 shadow hover:shadow-xl">
          <header className="font-semibold  p-2 px-4 ">Anotações</header>
          <section className="flex flex-col px-3  overflow-auto scroll-none h-auto max-h-[15rem] ">
            <Todo />
          </section>
        </div>

        <h2 className="text-lg font-semibold text-zinc-500 dark:text-zinc-200">
          Rendimentos hoje
        </h2>
        <div className="flex flex-col relative gap-3 overflow-hidden w-full h-[12rem] bg-gradient-45 from-zinc-900 to-zinc-950 rounded-xl hover:shadow-xl">
          <ResponsiveContainer width="100%" height="80%">
            <LineChart width={500} height={300} data={data} margin={{ top: 60 }}>
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
              R$ 0,00 Hoje
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
