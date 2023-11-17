"use client";

import { useRef, useState } from "react";
import * as S from "./style";
import DashboardComponent from "@/components/dashboardComponent";
import { AnimatePresence, LayoutGroup, motion, useScroll } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import moment from "moment-timezone";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { fontOpenSans } from "@/app/fonts";

function useHome() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectedItem = (value: string | null) => {
    setSelectedId((prev) => {
      return prev ? null : value;
    });
  };

  return {
    handleSelectedItem,
    selectedId,
    setSelectedId,
  };
}

export default function Home() {
  const { handleSelectedItem, selectedId } = useHome();

  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });

  console.log(scrollXProgress);
  return (
    <S.Container className={fontOpenSans}>
      <header className="flex p-1 bg-red-200">
        
      </header>
      <AnimatePresence>
        <S.Component>
          <DashboardComponent
            transition={{ delay: 0.2 }}
            onClick={() => handleSelectedItem("teste-1")}
            className=" w-auto min-h-[10rem]"
          >
            <S.Bubble $top={"-40%"} />
            <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
              <S.TitleComponent>
                <div className={`font-semibold opacity-70 ${fontOpenSans}`}>
                  Emails enviados
                </div>
                <div className="text-cyan-300">25.3%</div>
              </S.TitleComponent>
              <S.ContentComponent>
                <div className="flex flex-col gap-1 p-2">
                  <MdEmail size="22" className="text-cyan-500" />
                  <span className="text-xl font-semibold">120</span>
                  <p className="text-sm text-cyan-500">Emails enviados</p>
                </div>
                <div className="relative items-center justify-center flex">
                  <svg
                    className="rotate-[-90deg]"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <S.Circle
                      cx="50"
                      cy="50"
                      r="30"
                      pathLength="1"
                      className="stroke-cyan-400"
                    />
                    <S.Progress
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.9 }}
                      transition={{
                        duration: 2,
                        delay: 0.2,
                        type: "spring",
                      }}
                      cx="50"
                      cy="50"
                      r="30"
                      pathLength="1"
                      className="stroke-cyan-500 relative"
                    ></S.Progress>
                  </svg>
                  <span className="p-2 absolute font-semibold opacity-50 text-cyan-600">
                    97%
                  </span>
                </div>
              </S.ContentComponent>
            </motion.div>
          </DashboardComponent>
          <DashboardComponent
            transition={{ delay: 0.1 }}
            onClick={() => handleSelectedItem("teste-2")}
            className=" w-auto min-h-[10rem]"
          >
            <S.Bubble $top={"20%"} />

            <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
              <S.TitleComponent>
                <div className={`font-semibold opacity-70 ${fontOpenSans}`}>
                  Clientes
                </div>
                <div className="text-cyan-300">22.3%</div>
              </S.TitleComponent>
              <S.ContentComponent>
                <div className="flex flex-col gap-1 p-2">
                  <FaUser size="22" className="text-cyan-500" />
                  <span className="text-lg font-semibold">120</span>
                  <p className="text-sm text-cyan-500">Clientes novos</p>
                </div>
                <div className="relative items-center justify-center flex">
                  <svg
                    className="rotate-[-90deg]"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                  >
                    <S.Circle
                      cx="50"
                      cy="50"
                      r="30"
                      pathLength="1"
                      className="stroke-cyan-400"
                    />
                    <S.Progress
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.77 }}
                      transition={{
                        duration: 2,
                        delay: 0.2,
                        type: "spring",
                      }}
                      cx="50"
                      cy="50"
                      r="30"
                      pathLength="1"
                      className="stroke-cyan-500 relative"
                    ></S.Progress>
                  </svg>
                  <span className="p-2 absolute font-semibold opacity-50 text-cyan-600">
                    77%
                  </span>
                </div>
              </S.ContentComponent>
            </motion.div>
          </DashboardComponent>
          <DashboardComponent
            transition={{ delay: 0.4 }}
            className=" w-auto min-h-[10rem]"
          >
            <S.Bubble $top={"-50%"} $left="40%" />

            <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
              <S.TitleComponent>
                <div>Teste</div>
                <div>25.3%</div>
              </S.TitleComponent>
            </div>
          </DashboardComponent>
        </S.Component>
        <S.Component>
          <DashboardComponent
            style={{ flex: 4 }}
            transition={{ delay: 0.4 }}
            className=" w-auto h-[15rem]"
          >
            <S.Bubble $left="-30%" $top={"0%"} />
            <S.Bubble $left="70%" $top={"30%"} />

            <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
              <S.TitleComponent>
                <div>Entrada e saída do financeiro</div>
                <div>25.3%</div>
              </S.TitleComponent>
            </div>
            <ResponsiveContainer width="98%" height="100%" className="m-auto">
              <AreaChart
                data={[
                  { id: 1, value: 100, date: moment().format("YYYY-MM-DD") },
                  {
                    id: 2,
                    value: 120,
                    date: moment().add(1, "days").format("YYYY-MM-DD"),
                  },
                  {
                    id: 3,
                    value: 90,
                    date: moment().add(2, "days").format("YYYY-MM-DD"),
                  },
                ]}
                className="overflow-visible"
              >
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64C9F3" stopOpacity="0.4" />
                    <stop offset="200%" stopColor="#64C9F3" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <Area
                  type={"monotone"}
                  dataKey="value"
                  stroke="#64C9F3"
                  fill="url(#color)"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  opacity={0.8}
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
          </DashboardComponent>
          <DashboardComponent style={{ flex: 2 }}>Teste</DashboardComponent>
        </S.Component>
        <S.Component>
          <DashboardComponent
            transition={{ delay: 0.5 }}
            className=" w-auto min-h-[12rem]"
          >
            <S.Bubble $top="20%" />

            <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
              <S.TitleComponent>
                <div>Teste</div>
                <div>25.3%</div>
              </S.TitleComponent>
            </div>
          </DashboardComponent>
          <DashboardComponent
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
        {/*  {selectedId && (
          <motion.div
            key={`modal`}
            className="fixed top-0 left-0 w-full h-screen bg-zinc-900 bg-opacity-10 z-[15] flex justify-center items-center"
          >
            <S.Modal
              className="bg-zinc-800 rounded-md overflow-hidden w-[45rem] h-[25rem] relative z-[14]"
              layoutId={selectedId}
            >
              <S.Bubble $top={"-40%"} />
              <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
                <button onClick={() => handleSelectedItem(selectedId)}>
                  fechar
                </button>
                <S.TitleComponent>
                  <div>Teste</div>
                  <div>25.3%</div>
                </S.TitleComponent>
              </motion.div>
            </S.Modal>
          </motion.div>
        )} */}
      </AnimatePresence>
    </S.Container>
  );
}
