"use client";

import DashboardComponent from "@/components/dashboardComponent";
import { AnimatePresence, motion } from "framer-motion";
import { fontOpenSans } from "@/app/fonts";
import Events from "./sendEmail";
import NewClients from "./clients";
import NewServices from "./newServices";
import Finance from "./finance";
import Registers from "./registers";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import * as S from "./style";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const data: any = [];
for (let i = 0; i < 15; i++) {
  data.push({
    id: i,
    value: getRandomInt(0, 2000),
  });
}

function useHome() {
  const [showModalFilter, setShowModalFilter] = useState<boolean>(false);

  return {
    showModalFilter,
    setShowModalFilter,
  };
}

export default function Home() {
  const { showModalFilter, setShowModalFilter } = useHome();

  return (
    <S.Container className={fontOpenSans}>
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className={`text-2xl opacity-70 font-semibold`}>DASHBOARD</h1>
          <h2 className="text text-cyan-500">Bem vindo ao seu dashboard!</h2>
        </div>
        <div className="flex gap-2">
          <AnimatePresence>
            <motion.button
              key={"button-modal"}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowModalFilter(true)}
              layoutId={"filter"}
              className="bg-gradient-45 opacity-90 z-[5] hover:opacity-100 text-white from-purple-600 to-blue-400 rounded p-2"
            >
              Filtrar
            </motion.button>
            {showModalFilter && (
              <motion.div
                key={`modal-filter`}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed top-0 left-0 w-full h-screen bg-zinc-900 bg-opacity-10 z-[15] backdrop-blur-md flex justify-center items-center"
              >
                <S.Modal
                  className="bg-zinc-800 flex flex-col rounded-md w-[30rem] h-[25rem] relative z-[100]"
                  layoutId={"filter"}
                >
                  <S.Bubble $top={"-40%"} />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex p-3 rounded-md absolute z-[30] top-0 right-0 absolute translate-x-[50%] translate-y-[-50%]"
                  >
                    <button
                      className="bg-gradient-45 from-purple-500 opacity-90 hover:opacity-100 shadow-lg to-emerald-500 p-2 rounded-full flex w-auto"
                      onClick={() => setShowModalFilter(false)}
                    >
                      <IoClose size="24" />
                    </button>
                  </motion.div>
                </S.Modal>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      <S.Component>
        <DashboardComponent
          key={"events"}
          transition={{ delay: 0.2 }}
          className=" w-auto min-h-[10rem]"
        >
          <S.Bubble $top={"-40%"} />
          <Events />
        </DashboardComponent>
        <DashboardComponent
          key={"newClients"}
          transition={{ delay: 0.1 }}
          className=" w-auto min-h-[10rem]"
        >
          <S.Bubble $top={"20%"} />
          <NewClients />
        </DashboardComponent>
        <DashboardComponent
          key={"newServices"}
          transition={{ delay: 0.4 }}
          className=" w-auto min-h-[10rem]"
        >
          <S.Bubble $top={"-50%"} $left="40%" />
          <NewServices />
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent
          key={"finance"}
          style={{ flex: 4 }}
          transition={{ delay: 0.4 }}
          className=" w-auto h-[20rem]"
        >
          <S.Bubble $left="-30%" $top={"0%"} />
          <S.Bubble $left="70%" $top={"30%"} />
          <Finance />
        </DashboardComponent>
        <DashboardComponent
          key={"registerss"}
          style={{ flex: 2, overflow: "auto", height: "20rem" }}
        >
          <S.Bubble $left="-30%" $top={"0%"} />
          <Registers />
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent
          key={"component1"}
          transition={{ delay: 0.5 }}
          className=" w-auto min-h-[12rem] p-3"
        >
          <S.Bubble $top="20%" />
          <S.TitleComponent>
            <div
              className={`font-semibold opacity-70 px-4 flex-col py-2 ${fontOpenSans}`}
            >
              <h2>Entrada e saída de capital</h2>
              <div className="text-cyan-300 text-xl">22.3%</div>
            </div>
          </S.TitleComponent>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={3}
              />
              <Tooltip />
              <YAxis
                dataKey="value"
                axisLine={false}
                tickLine={false}
                tickCount={8}
                width={70}
                tickFormatter={(number) => `${number.toFixed(2)}`}
                opacity={0.8}
              />
              <CartesianGrid opacity={0.1} vertical={false} />
            </LineChart>
          </ResponsiveContainer>
        </DashboardComponent>
        <DashboardComponent
          key={"component2"}
          transition={{ delay: 0.6 }}
          className=" w-auto min-h-[12rem] "
        >
          <S.Bubble $top="60%" />
          <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
            <S.TitleComponent>
              <div>Teste</div>
              <div>25.3%</div>
            </S.TitleComponent>
          </div>
        </DashboardComponent>
      </S.Component>
    </S.Container>
  );
}
