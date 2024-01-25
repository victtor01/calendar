"use client";

import PrivateRoute from "@/components/privateRoute";
import { usePathname } from "next/navigation";
import * as S from "./style";
import { Sidebar } from "@/components/sidebar";
import { IconType } from "react-icons";
import { fontOpenSans, fontRoboto } from "../fonts";
import { Suspense, createContext, useEffect, useState } from "react";
import { FaCalendar, FaChevronRight, FaCrown } from "react-icons/fa";
import { BiExit, BiPen } from "react-icons/bi";
import { ThemeProvider } from "styled-components";
import { RxExit } from "react-icons/rx";
import { RiMoonLine, RiSuitcaseFill, RiSunLine } from "react-icons/ri";
import { PiSuitcaseSimple } from "react-icons/pi";
import Loading from "@/components/loading";
import UserComponents from "@/components/userComponents";
import { useSessionContext } from "@/contexts/sessionContext";
import { Theme, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { GoGear, GoHomeFill, GoPersonFill } from "react-icons/go";
import { CiCircleList } from "react-icons/ci";
import Image from "next/image";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { Server } from "@/constants/server";
import { IoClose } from "react-icons/io5";
import { SidebarRelativePrivate } from "@/components/layoutPrivate/sidebar";
import { ThemeContext } from "@/contexts/themeContext";
import Information from "@/components/layoutPrivate/informations";

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
  primary: "#F5F9FC",
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
  { name: "Dashboard", icon: GoHomeFill, href: "/home" },
  { name: "Calendário", icon: FaCalendar, href: "/calendar" },
  { name: "Financeiro", icon: FaCircleDollarToSlot, href: "/finance" },
  { name: "Clientes", icon: GoPersonFill, href: "/clients" },
  { name: "Serviços", icon: RiSuitcaseFill, href: "/services" },
  { name: "To-do", icon: CiCircleList, href: "/todo" },
  { name: "Configurar", icon: GoGear, href: "/configurations" },
];

const otherPages: Page[] = [
  { name: "Entrar em contato", href: "/" },
  { name: "Reportar bug", href: "/" },
  { name: "Ajuda", href: "/" },
  { name: "Termos de serviço", href: "/" },
];

const variants = {
  open: {
    left: "0%",
  },
  hidden: {
    left: "-100%",
  },
};

const Separator = () => (
  <span className="w-full h-[1px] bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
);

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

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    theme: { theme, handleTheme, IconTheme },
    utils: { sidebarShow, onClickSidebarShow, currentPath },
  } = useLayout();

  const { userInfo, logout } = useSessionContext();

  return (
    <PrivateRoute>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <ThemeContext.Provider value={{ theme, handleTheme }}>
          <S.Container className="bg-gray-50 dark:bg-gradient-45 from-zinc-950 to-zinc-900 ">
            {/*  <S.Bubble className="after:opacity-50 after:dark:opacity-[0.4] before:opacity-30 before:dark:opacity-[0.2]" /> */}

            <div className="flex absolute right-0 top-0 h-full w-[30%] bg-gradient-to-r from-transparent to-blue-100 dark:from-transparent dark:to-black"></div>

            <SidebarRelativePrivate />

            <Sidebar
              animate={sidebarShow ? "open" : "hidden"}
              variants={variants}
              transition={{ duration: 0.4 }}
              className={`w-[100%] text-white max-h-[100%] z-[100] overflow-y-scroll fixed h-[100%] flex flex-col bg-zinc-900 ${fontOpenSans} w-[15rem]`}
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
                {pages.map(
                  ({ name, icon: Icon, href }: Page, index: number) => {
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
                          {Icon && (
                            <Icon size={"16"} className="min-w-[3rem]" />
                          )}
                          <span className="felx">{name}</span>
                        </S.LinkRoute>
                      </motion.div>
                    );
                  }
                )}
              </div>
              <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
              <div className="p-3 flex-1"></div>
              <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
              <footer className="flex flex-col text-sm">
                <button
                  onClick={logout}
                  className="p-3 flex items-center gap-3"
                >
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

            <Suspense fallback={<Loading />}>
              <S.Content className="bg-transparent p-4 max-w-[100rem]  w-full mx-auto">
                <UserComponents />
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

            <Information />
          </S.Container>
        </ThemeContext.Provider>
      </ThemeProvider>
    </PrivateRoute>
  );
}
