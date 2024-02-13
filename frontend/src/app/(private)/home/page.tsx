"use client";

import * as S from "./style";
import { AnimatePresence, motion } from "framer-motion";
import { useSessionContext } from "@/contexts/sessionContext";
import { useState } from "react";

// components
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Building } from "@/components/building";
import ComponentsHome from "@/components/home";
import moment from "moment-timezone";
import Modal from "@/components/modal";

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
      <section className="flex flex-col gap-3 max-w-[100rem] w-full mx-auto">
        <header className="flex items-center justify-between self-start  w-full flex-1 ">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <h1
              className={`text-3xl opacity-90 dark:text-gray-400 text-gray-700 font-semibold`}
            >
              Dashboard
            </h1>
            <time className="block mb-2 text-sm font-normal text-gray-600 px-1 leading-none">
              {moment().format("dddd, DD MMM YYYY")}
            </time>
          </motion.div>
          <section className="flex gap-2">
            <AnimatePresence>
              <motion.button
                key={"button-modal"}
                onClick={() => setShowModalFilter(true)}
                layoutId={"filter"}
                whileTap={{ scale: 0.9, transition: { type: "spring" } }}
                className="bg-indigo-600 text-white z-[3] px-5 flex gap-2 items-center rounded p-3"
              >
                Filtrar
                <FaFilter />
              </motion.button>
              {showModalFilter && (
                <Modal layoutId="filter">
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
                  <section>
                    <Building />
                  </section>
                </Modal>
              )}
            </AnimatePresence>
          </section>
        </header>

        <ComponentsHome />
      </section>
    </S.Container>
  );
}

{
  /*  <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: "spring", duration: 1.5, delay: 0.1 }}
        className="w-full gap-10 h-[20rem] flex justify-center items-center overflow-hidden relative overflow-y-visible bg-gradient-45 from-purple-700 to-cyan-400  dark:to-purple-800 dark:from-cyan-400 rounded-xl "
      >
        <section className="flex w-full h-full items-center justify-center relative ">
          <span className="absolute left-[50%] translate-x-[-50%] w-[70%] h-[170%] bg-black p-7 top-[-70%] rounded-b-full  blur-[10rem]" />
          { <Image
          src={`/moon.png`}
          className="rounded-md filter  brightness-[0.9]"
          sizes="(max-width: 2rem) 2rem, 1200px"
          fill
          objectPosition="center bottom"
          quality={100}
          style={{ objectFit: "cover" }}
          alt="Foto do usuario"
        />}
          <div className="  flex justify-between rounded-xl absolute w-full max-w-[60rem] text-white">
            <div className="flex flex-col justify-center">
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-[1.4rem] flex gap-2 font-semibold ${fontOpenSans}`}
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
        </section>
      </motion.div> */
}
