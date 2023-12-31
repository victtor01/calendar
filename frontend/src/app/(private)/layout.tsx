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
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp, IoMdNotificationsOutline } from "react-icons/io";
import { GoGear, GoHomeFill, GoPersonFill } from "react-icons/go";
import { CiCircleList } from "react-icons/ci";
import Image from "next/image";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { Server } from "@/constants/server";
import { IoClose } from "react-icons/io5";
import { SidebarRelativePrivate } from "@/components/layoutPrivate/sidebar";

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

export const ThemeContext = createContext({
  theme: "dark",
  handleTheme: (): any => null,
});

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
          <S.Bubble />
          <S.Container className="bg-white dark:bg-gradient-45 from-neutral-950 to-zinc-900 p-2 pl-4 ">
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
              <S.Content className="bg-blue-50 dark:bg-zinc-950 rounded-2xl ">
                {/*   <header
                className="justify-between  bg-trnasparent flex pl-2 h-auto items-center top- w-auto m-1 rounded-xl top-0 sticky"
                style={{
                  width: "auto",
                }}
              >
                <div className={`flex gap-1 font-semibold text-lg`}>
                  <span className="absolute bg-gradient-45 from-[#6157FF] via-[#74FEBD] from-10% to-80% blur-2xl opacity-20 shadow-purple-500 to-transparent bg-opacity-50 h-full w-[50%] z-[2] transform -skew-x-[-26deg] left-[-20px]" />
                  Olá,
                  <span className="flex text-purple-700">
                    {userInfo?.firstName}!
                    </span>
                </div>
                <div className="flex rounded-full">
                <UserComponents />
                </div>
              </header> */}
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

            <div
              style={{ gridArea: "user" }}
              className="bg-transparent py-4 px-2 flex flex-col gap-5 w-[16rem]"
            >
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

              <section className={`flex flex-col opacity-70 ${fontRoboto}`}>
                <h1 className="text-xl font-bold">{userInfo?.firstName}</h1>
                <h2 className="text-xl font-bold">{userInfo?.lastName}</h2>
              </section>
              <section className="bg-blue-50 dark:bg-zinc-800 rounded flex p-3">
                <div className=""></div>
                <div className="flex flex-1 items-center">
                  <h1 className="text-xl font-semibold">R$ 230,00</h1>
                </div>
              </section>
            </div>
          </S.Container>
        </ThemeContext.Provider>
      </ThemeProvider>
    </PrivateRoute>
  );
}
