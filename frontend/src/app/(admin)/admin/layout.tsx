"use client";

import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { fontOpenSans, fontValela } from "@/app/fonts";
import { useSessionContext } from "@/contexts/sessionContext";
import { motion } from "framer-motion";
import * as S from "./style";

import Empty from "@/components/empty";
import { useRouter } from "next/navigation";

const animateActions = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const darkTheme = {
  primary: "#101010",
  secundary: "#1f1d2b",
  text: "#ebe8e8",
  shadow: "#202020",
  lightPurple: "#4B0082",
  darkPurple: "#5a0f8f",
  linearPurple: "",
  darkBlue: "#3d6bcd",
  lightBlue: "#437fff",
  border: "#3e3e3e",
};

const lightTheme = {
  primary: "rgba(238,240,248,1) ",
  secundary: "#fff",
  shadow: "#f6f6f6",
  text: "#000",
  lightPurple: "#4B0082",
  darkPurple: "#5a0f8f",
  linearPurple: "",
  border: "rgba(0,0,0,0.1)",
};

const useLayout = () => {
  const [theme, setTheme] = useState<string>("light");

  const handleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return {
    theme,
    handleTheme,
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { handleTheme, theme } = useLayout();
  const router = useRouter();
  const { userInfo, logout } = useSessionContext();
  if (!userInfo) return <Empty />;
  const { firstName } = userInfo;

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <S.Container className={`${fontOpenSans}`}>
        <S.Bubble />
        <S.Header className="p-4 p-5 relative text-lg flex h-auto shadow-md rounded-md p-0 justify-between items-center w-auto m-3">
          <div className="flex">Olá, {firstName}</div>
          <div className="flex gap-4">
            <button onClick={handleTheme}>Theme</button>
            <button onClick={logout}>Sair</button>
          </div>
        </S.Header>
        <section className="flex w-[98%] shadow-xl max-w-[69rem] bg-gradient-45 from-purple-600 to-blue-500 p-10 py-14 mx-auto mt-[3rem] flex-col rounded-xl">
          <div className="text-white">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-2xl"
            >
              Bem vindo de volta, <strong>admin {firstName}</strong>
            </motion.h2>
          </div>
          <div className="text-white">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              className={`${fontValela}`}
            >
              Tenha um ótimo dia de trabalho!
            </motion.p>
          </div>
        </section>
        <S.SectionActions className=" flex gap-3 scroll-smooth mx-auto p-2 mt-[3rem] max-w-[100%] overflow-x-auto min-h-[15rem] snap-x ">
          <S.ActionsComponents
            onClick={() => router.push("/admin/tes")}
            initial="initial"
            animate="animate"
            variants={animateActions}
            transition={{ delay: 0.1 }}
            className="snap-center bg-zinc-400 gap-2 flex-col bg-opacity-20 min-w-[22rem] backdrop-blur-xl p-2 flex rounded"
          >
            <header className="w-full min-h-[10rem] flex justify-between p-2">
              <h2 className="text-lg">Dashboard</h2>
              <p>Teste</p>
            </header>
          </S.ActionsComponents>
          <S.ActionsComponents
            onClick={() => router.push("/admin/")}
            initial="initial"
            animate="animate"
            variants={animateActions}
            transition={{ delay: 0.2 }}
            className="snap-center bg-zinc-400 gap-2 flex-col bg-opacity-20 min-w-[22rem] backdrop-blur-xl p-2 flex rounded"
          >
            <header className="w-full min-h-[10rem] flex justify-between p-2">
              <h2 className="text-lg">Clientes</h2>
              <p>Teste</p>
            </header>
          </S.ActionsComponents>
          <S.ActionsComponents
            onClick={() => router.push("/admin/")}
            initial="initial"
            animate="animate"
            variants={animateActions}
            transition={{ delay: 0.3 }}
            className="snap-center bg-zinc-400 gap-2 flex-col bg-opacity-20 min-w-[22rem] backdrop-blur-xl p-2 flex rounded"
          >
            <header className="w-full min-h-[10rem] flex justify-between p-2">
              <h2 className="text-lg">Responder</h2>
              <p>Teste</p>
            </header>
          </S.ActionsComponents>
        </S.SectionActions>
        <S.Content>{children}</S.Content>
      </S.Container>
    </ThemeProvider>
  );
}
