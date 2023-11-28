"use client";

import DashboardComponent from "@/components/dashboardComponent";
import { AnimatePresence, motion } from "framer-motion";
import { fontInter, fontOpenSans, fontValela } from "@/app/fonts";
import Events from "./events";
import NewClients from "./clients";
import NewServices from "./services";
import Finance from "./finance";
import Registers from "./registers";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import ClientsMonth from "./clientsMonth";
import ResumeRegisters from "./resume";
import moment from "moment-timezone";
import { FaFilter } from "react-icons/fa";
import * as S from "./style";

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
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col"
        >
          <h1 className={`text-2xl font-semibold`}>DASHBOARD</h1>
          <h2 className={`text-cyan-500 ${fontValela}`}>
            {moment().format("dddd, DD MMM YYYY")}
          </h2>
        </motion.div>
        <div className="flex gap-2">
          <AnimatePresence>
            <motion.button
              key={"button-modal"}
              onClick={() => setShowModalFilter(true)}
              layoutId={"filter"}
              whileTap={{ scale: 0.9, transition: { type: "spring" } }}
              className="bg-gradient-45 z-[5] flex gap-2 items-center text-white from-blue-500 to-emerald-500 rounded p-3 px-4"
            >
              <FaFilter />
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: "spring", duration: 1.5, delay: 0.1}}
        className="w-full relative gap-10 p-8 h-[11rem] flex justify-center bg-gradient-45 from-purple-600 to-emerald-300 rounded-2xl shadow-xl"
      >
        <S.BubbleBanner />
        <div className="flex flex-col gap-1 flex-1 justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-[1.7rem] flex gap-2 ${fontOpenSans}`}
          >
            Bem vindo de volta,
            <p className={`${fontInter} font-semibold`}>José Victor.</p>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`${fontValela} text-md`}
          >
            Tenha um bom dia de trabalho!
          </motion.h2>
        </div>
      </motion.div>
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
        <DashboardComponent
          key={"events"}
          transition={{ delay: 0.2 }}
          className=" w-auto min-h-[10rem]"
        >
          <S.Bubble $top={"-40%"} />
          <ResumeRegisters />
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent
          key={"finance"}
          style={{ flex: 4 }}
          transition={{ delay: 0.4 }}
          className=" w-auto h-[25rem]"
        >
          <S.Bubble $left="-30%" $top={"0%"} />
          <S.Bubble $left="70%" $top={"30%"} />
          <Finance />
        </DashboardComponent>
        <DashboardComponent
          key={"registers"}
          className="min-w-[15rem]"
          style={{
            flex: 2,
            overflowY: "auto",
            overflowX: "hidden",
            height: "25rem",
            padding: 0,
          }}
        >
          <S.Bubble $left="-30%" $top={"0%"} />
          <Registers />
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent
          key={"component1"}
          transition={{ delay: 0.5 }}
          className=" w-auto min-h-[20rem] p-3"
        >
          <S.Bubble $top="20%" />
          <ClientsMonth />
        </DashboardComponent>
      </S.Component>
      <S.Component>
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
