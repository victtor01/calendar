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
import { useSessionContext } from "@/contexts/sessionContext";
import TopClients from "./topClients";
import Image from "next/image";
import { Server } from "@/constants/server";

function getRandomInt(min: number, max: number): number {
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
  const { userInfo } = useSessionContext();

  return (
    <S.Container className={"p-2"}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: "spring", duration: 1.5, delay: 0.1 }}
        className="w-full gap-10 h-[30rem] flex justify-center items-center relative overflow-y-visible bg-gradient-45 from-purple-600 to-emerald-300 rounded-md "
      >
        <header className="flex items-center justify-between self-start z-10 flex-1 p-1 px-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className={`text-3xl font-semibold text-white`}>Dashboard</h1>
            <time className="block mb-2 text-sm font-normal leading-none text-white dark:text-gray-500">
              {moment().format("dddd, DD MMM YYYY")}
            </time>
          </motion.div>
          <div className="flex gap-2">
            <AnimatePresence>
              <motion.button
                key={"button-modal"}
                onClick={() => setShowModalFilter(true)}
                layoutId={"filter"}
                whileTap={{ scale: 0.9, transition: { type: "spring" } }}
                className="bg-blue-50 dark:bg-zinc-900 border dark:border-zinc-700 z-[3] flex gap-2 items-center rounded p-3 px-4"
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
                      className="flex p-3 rounded-md absolute z-[30] top-0 right-0 translate-x-[50%] translate-y-[-50%]"
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
        <Image
          src={`/moon.png`}
          className="rounded-md filter  brightness-[0.9]"
          sizes="(max-width: 2rem) 2rem, 1200px"
          fill
          objectPosition="center bottom"
          quality={100}
          style={{ objectFit: "cover" }}
          alt="Foto do usuario"
        />
        <div className="p-4 hover:shadow-xl h-[8rem] bg-opacity-70 dark:bg-opacity-80 backdrop-blur-md transition-shadow px-6 bg-blue-50 dark:bg-slate-900 shadow-md flex justify-between rounded-xl absolute  w-[50%]">
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-[1.1rem] flex gap-2 font-semibold ${fontOpenSans}`}
            >
              Olá! Bem vindo de volta,
              <p className={`${fontInter} font-semibold`}>
                {userInfo?.firstName}
              </p>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`${fontValela} text-md`}
            >
              Tenha uma ótimo dia!
            </motion.h2>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col items-end">
              <h1 className="font-semibold">{userInfo.email}</h1>
              <h2 className={fontInter}>{userInfo.firstName}</h2>
            </div>
            <div className="bg-zinc-400 w-16 h-16 relative rounded-full overflow-hidden">
              <Image
                src={`${Server}/uploads/${userInfo.photo}`}
                sizes="(max-width: 2rem) 2rem, 1200px"
                fill
                quality={25}
                style={{ objectFit: "cover" }}
                alt="Foto do usuario"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <section className="flex flex-col gap-3">
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
            key={"resume-registers"}
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
            className=" w-auto min-h-[20rem] "
          >
            <S.Bubble $top="60%" />
            <TopClients />
          </DashboardComponent>
          <DashboardComponent
            key={"component3"}
            transition={{ delay: 0.8 }}
            className="w-auto min-h-[20rem] "
          >
            <S.Bubble $top="60%" />
            <TopClients />
          </DashboardComponent>
        </S.Component>
      </section>
    </S.Container>
  );
}
