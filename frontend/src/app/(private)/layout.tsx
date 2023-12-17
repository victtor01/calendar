"use client";

import PrivateRoute from "@/components/privateRoute";
import { usePathname } from "next/navigation";
import * as S from "./style";
import { Sidebar } from "@/components/sidebar";
import { IconType } from "react-icons";
import { BsCalendarRange, BsFillGearFill, BsHouse } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import { fontOpenSans, fontRoboto, fontValela } from "../fonts";
import { Suspense, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { BiSolidGroup } from "react-icons/bi";
import { ThemeProvider } from "styled-components";
import { RxExit } from "react-icons/rx";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { PiSuitcaseSimple } from "react-icons/pi";
import Loading from "@/components/loading";
import UserComponents from "@/components/userComponents";
import { useSessionContext } from "@/contexts/sessionContext";
import { Theme, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { LuListTodo } from "react-icons/lu";
import Link from "next/link";

/* #1f1d2b */
/*  rgb(24, 24, 27) */

const darkTheme = {
  primary: "rgb(9, 9, 11)",
  secundary: "rgb(24, 24, 27, 1)",
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

interface Page {
  name: string;
  href: string;
  icon?: IconType;
}

const pages: Page[] = [
  { name: "Dashboard", icon: BsHouse, href: "/home" },
  { name: "Calendário", icon: BsCalendarRange, href: "/calendar" },
  { name: "Financeiro", icon: FiTrendingUp, href: "/finance" },
  { name: "Clientes", icon: BiSolidGroup, href: "/clients" },
  { name: "Serviços", icon: PiSuitcaseSimple, href: "/services" },
  { name: "To-do", icon: LuListTodo, href: "/todo" },
  { name: "Configurar", icon: BsFillGearFill, href: "/configurations" },
];

const otherPages: Page[] = [
  { name: "Entrar em contato", href: "/" },
  { name: "Reportar bug", href: "/" },
  { name: "Ajuda", href: "/" },
  { name: "Termos de serviço", href: "/" },
];

const useLayout = () => {
  const [sidebarShow, setSidebarShow] = useState(false);
  const [theme, setTheme] = useState<string>("dark");

  const handleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const IconTheme = theme === "dark" ? RiMoonLine : RiSunLine;

  const onClickSidebarShow = () => {
    setSidebarShow((prev) => !prev);
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      if (theme === "dark") {
        html.classList.add("dark");
        html.classList.remove("light");
      } else {
        html.classList.add("light");
        html.classList.remove("dark");
      }
    }
  }, [theme]);

  const currentPath = usePathname().split("/")[1];

  return {
    theme: {
      theme,
      handleTheme,
      IconTheme,
    },
    utils: {
      sidebarShow,
      onClickSidebarShow,
      currentPath,
    },
  };
};

const variants = {
  open: {
    left: "0%",
  },
  hidden: {
    left: "-100%",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    theme: { theme, handleTheme, IconTheme },
    utils: { sidebarShow, onClickSidebarShow, currentPath },
  } = useLayout();

  const { userInfo, logout } = useSessionContext();

  return (
    <PrivateRoute>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <S.Container className="bg-white dark:bg-zinc-950">
          <Sidebar
            bgTheme={false}
            style={{ gridArea: "sidebar" }}
            className={`w-[4rem] lg:w-[12rem] bg-zinc-900 relative shadow-2xl shadow-zin-800 overflow-x-hidden overflow-y-auto items-center text-white lg:items-start flex flex-col font-semibold ${fontOpenSans}`}
          >
            <header className="w-full flex items-center relative h-auto">
              <div
                className={
                  "flex-none bg-transparent font-semibold text-md p-5" +
                  ` ${fontRoboto}`
                }
              >
                <span className="hidden lg:flex z-20">CRS</span>
              </div>
            </header>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <div className="p-3 px-5 flex-col flex gap-1">
              <span className="text-sm">{userInfo?.firstName}</span>
              <span className="text-xs">
                Ver o meu{" "}
                <strong className="font-semibold text-purple-600">
                  Plano!
                </strong>
              </span>
            </div>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <button
              onClick={onClickSidebarShow}
              className="relative w-[3rem] lg:hidden opacity-70 hover:opacity-100 rounded min-h-[3rem] flex items-center bg-zinc-500 bg-opacity-10 justify-center p-3 "
            >
              <FaChevronRight />
            </button>
            <div className="flex flex-col mt-0 gap-1 relative flex-nowrap w-full p-2">
              {pages.map(({ name, icon: Icon, href }: Page, index: number) => {
                const selected = currentPath === href.substring(1);
                return (
                  <motion.div
                    key={name}
                    className="relative"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index / 10, type: "spring" }}
                  >
                    <S.LinkRoute
                      href={href}
                      className={`${
                        selected
                          ? "bg-gradient-45 bg-zinc-800 opacity-100"
                          : "transparent opacity-80"
                      } transition-all rounded hover:bg-zinc-800 flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-2 text-sm hover:opacity-100 p-1  `}
                    >
                      {Icon && <Icon size={"16"} className="min-w-[3rem]" />}
                      <span className="hidden lg:flex">{name}</span>
                    </S.LinkRoute>
                  </motion.div>
                );
              })}
            </div>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <div className="p-3 flex-1 w-full flex flex-col">
              {otherPages.map(({ name, href }: Page, index: number) => {
                const selected = currentPath === href.substring(1);
                return (
                  <motion.div
                    key={name}
                    className="relative"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index / 10, type: "spring" }}
                  >
                    <S.LinkRoute
                      href={href}
                      className={`${
                        selected
                          ? "bg-gradient-45 bg-zinc-800 opacity-100"
                          : "transparent opacity-60"
                      } transition-all text-sm rounded hover:bg-zinc-800 flex-nowrap w-full px-4 justify-center relative lg:justify-start flex py-2 items-center gap-2 text-sm hover:opacity-100 p-1  `}
                    >
                      <span className="hidden lg:flex">{name}</span>
                    </S.LinkRoute>
                  </motion.div>
                );
              })}
            </div>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <footer className="flex flex-col text-sm">
              <button onClick={logout} className="p-3 flex items-center gap-3">
                <RxExit />
                <span className="hidden lg:flex">Logout</span>
              </button>
              <button
                onClick={handleTheme}
                className="p-3 flex items-center gap-3"
              >
                <IconTheme />
                <span className="hidden lg:flex">
                  Tema: {theme === "dark" ? "Escuro" : "Claro"}
                </span>
              </button>
            </footer>
          </Sidebar>
          <Sidebar
            animate={sidebarShow ? "open" : "hidden"}
            variants={variants}
            transition={{ duration: 0.4 }}
            className={`w-[100%] text-white max-h-[100%] z-[50000] overflow-y-scroll fixed h-[100%] max-h-[100%] flex flex-col bg-zinc-900 ${fontOpenSans} w-[15rem]`}
          >
            <header className="w-full flex items-center relative h-auto">
              <div
                className={
                  "flex-none bg-transparent font-semibold text-md p-5" +
                  ` ${fontRoboto}`
                }
              >
                <span className="flex z-20">CRS</span>
                <button onClick={onClickSidebarShow}>fechar</button>
              </div>
            </header>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <div className="p-3 px-5 flex-col flex gap-1">
              <span className="text-sm">{userInfo?.firstName}</span>
              <span className="text-xs">
                Ver o meu{" "}
                <strong className="font-semibold text-purple-600">
                  Plano!
                </strong>
              </span>
            </div>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <div className="flex flex-col mt-0 gap-1 relative flex-nowrap w-full p-2">
              {pages.map(({ name, icon: Icon, href }: Page, index: number) => {
                const selected = currentPath === href.substring(1);
                return (
                  <motion.div
                    key={name}
                    className="relative"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index / 10, type: "spring" }}
                  >
                    <S.LinkRoute
                      href={href}
                      className={`${
                        selected
                          ? "bg-gradient-45 bg-zinc-800 opacity-100"
                          : "transparent opacity-80"
                      } transition-all rounded hover:bg-zinc-800 flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-2 text-sm hover:opacity-100 p-1`}
                    >
                      {Icon && <Icon size={"16"} className="min-w-[3rem]" />}
                      <span className="felx">{name}</span>
                    </S.LinkRoute>
                  </motion.div>
                );
              })}
            </div>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <div className="p-3 flex-1"></div>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <footer className="flex flex-col text-sm">
              <button onClick={logout} className="p-3 flex items-center gap-3">
                <RxExit />
                <span className="hidden lg:flex">Logout</span>
              </button>
              <button
                onClick={handleTheme}
                className="p-3 flex items-center gap-3"
              >
                <IconTheme />
                <span className="hidden lg:flex">
                  Tema: {theme === "dark" ? "Escuro" : "Claro"}
                </span>
              </button>
            </footer>
          </Sidebar>
          <header
            className="justify-between relative flex px-4 h-auto items-center relative w-auto border-b dark:border-zinc-800"
            style={{
              gridArea: "header",
              width: "auto",
            }}
          >
            <div className={"flex" + ` ${fontValela}`}>
              <span className="absolute bg-gradient-45 from-[#6157FF] via-[#74FEBD] from-10% to-80% blur-2xl opacity-20 shadow-purple-500 to-transparent bg-opacity-50 h-full w-[50%] z-[-1] transform -skew-x-[-26deg] left-[-20px]" />
              Olá, {userInfo?.firstName}!
            </div>
            <div className="flex rounded-full">
              <UserComponents />
            </div>
          </header>
          <Suspense fallback={<Loading />}>
            <S.Content className="bg-transparent dark:bg-zinc-950">
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme={theme.toLowerCase() as Theme}
              />
              {children}
            </S.Content>
          </Suspense>
        </S.Container>
      </ThemeProvider>
    </PrivateRoute>
  );
}
