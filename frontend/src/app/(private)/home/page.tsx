"use client";

import { useState } from "react";
import * as S from "./style";
import DashboardComponent from "@/components/dashboardComponent";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

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

  return (
    <S.Container>
      <AnimatePresence>
        <S.Component>
          <DashboardComponent
            layoutId={"teste-1"}
            onClick={() => handleSelectedItem("teste-1")}
            className=" w-auto min-h-[12rem]"
          >
            <S.Bubble $top={"-40%"} />
            <motion.div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
              <S.TitleComponent>
                <div>Teste</div>
                <div>25.3%</div>
              </S.TitleComponent>
            </motion.div>
          </DashboardComponent>
          <DashboardComponent
            layoutId={"teste-2"}
            onClick={() => handleSelectedItem("teste-2")}
            className=" w-auto min-h-[12rem] "
          >
            <S.Bubble $top={"20%"} />

            <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
              <S.TitleComponent>
                <div>Teste</div>
                <div>25.3%</div>
              </S.TitleComponent>
            </div>
          </DashboardComponent>
          <DashboardComponent
            transition={{ delay: 0.4 }}
            className=" w-auto min-h-[12rem] "
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
            transition={{ delay: 0.4 }}
            className=" w-auto min-h-[12rem]"
          >
            <S.Bubble $left="-30%" $top={"0%"} />
            <S.Bubble $left="70%" $top={"30%"} />

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
