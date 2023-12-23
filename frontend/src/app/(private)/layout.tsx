"use client";

import PrivateRoute from "@/components/privateRoute";
import { usePathname } from "next/navigation";
import * as S from "./style";
import { Sidebar } from "@/components/sidebar";
import { IconType } from "react-icons";
import { fontOpenSans, fontRoboto } from "../fonts";
import { Suspense, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { BiExit, BiPen } from "react-icons/bi";
import { ThemeProvider } from "styled-components";
import { RxExit } from "react-icons/rx";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { PiSuitcaseSimple } from "react-icons/pi";
import Loading from "@/components/loading";
import UserComponents from "@/components/userComponents";
import { useSessionContext } from "@/contexts/sessionContext";
import { Theme, ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp, IoMdNotificationsOutline } from "react-icons/io";
import { GoGear } from "react-icons/go";
import {
  CiAlignBottom,
  CiCalendar,
  CiCircleList,
  CiDollar,
  CiUser,
} from "react-icons/ci";
import Image from "next/image";

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
  { name: "Dashboard", icon: CiAlignBottom, href: "/home" },
  { name: "Calendário", icon: CiCalendar, href: "/calendar" },
  { name: "Financeiro", icon: CiDollar, href: "/finance" },
  { name: "Clientes", icon: CiUser, href: "/clients" },
  { name: "Serviços", icon: PiSuitcaseSimple, href: "/services" },
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
  <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
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

function NotificationComponent() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex">
      <div className="flex relative">
        <span className="bg-cyan-500 rounded-full absolute w-2 h-2 top-0 right-0" />
        <motion.button
          onClick={() => setOpen((prev) => !prev)}
          className="opacity-80 hover:opacity-100"
        >
          <IoMdNotificationsOutline size="21" />
        </motion.button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            key="modal-notification"
            className="shadow flex w-full min-w-[12rem] gap-3 flex-col absolute p-3 left-[100%] top-0 rounded-md ml-3 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 bg-white"
          >
            <header className="flex">
              <h2>Notificações</h2>
            </header>
            <section className="flex text-sm">Nenhum notificação</section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlanComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const { userInfo } = useSessionContext();

  return (
    <div className="p-3 px-5 flex gap-1 w-full justify-between items-center relative">
      <div className="flex flex-col">
        <span className="text-md capitalize">{userInfo?.firstName}</span>
        <span className="text-xs">
          Ver o meu{" "}
          <strong className="font-semibold text-purple-600">Plano!</strong>
        </span>
      </div>
      <motion.button
        animate={{
          rotate: open ? "90deg" : "0deg",
        }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex bg-zinc-200 dark:bg-zinc-700 p-2 rounded"
      >
        <IoIosArrowUp />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            key="modal-notification"
            className="shadow flex w-full min-w-[12rem] gap-3 flex-col absolute p-4 left-[100%] top-0 rounded-md ml-3 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 bg-white"
          >
            <header className="flex flex-col ">
              <div className="text-xs flex">
                <div>{userInfo?.firstName}</div>
                <div>{userInfo?.lastName}</div>
              </div>
              <p className="text-xs opacity-80">{userInfo?.email}</p>
            </header>
            <Separator />
            <section className="flex flex-col gap-3 text-sm">
              <motion.button className="flex gap-2 opacity-80 hover:opacity-100 items-center">
                <GoGear size="18" />
                <span className="text-sm font-light">Configurações</span>
              </motion.button>
              <motion.button className="flex gap-2 opacity-80 hover:opacity-100 items-center">
                <BiPen size="18" />
                <span className="text-sm font-light">Editar conta</span>
              </motion.button>
              <motion.button className="flex gap-2 opacity-80 hover:opacity-100 items-center">
                <BiExit size="18" />
                <span className="text-sm font-light">Logout</span>
              </motion.button>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
            className={`w-[4rem] lg:w-[14rem] bg-white m-2 dark:text-white rounded-xl dark:bg-zinc-900 dark:bg-opacity-80 relative border dark:border-zinc-800 items-center lg:items-start flex flex-col font-semibold ${fontOpenSans}`}
          >
            <S.Bubble />
            <header className="w-full flex items-center p-5 justify-between relative h-auto">
              <div className={`bg-transparent font-semibold text-md`}>
                <span className="hidden lg:flex z-20 opacity-60 dark:opacity-100">
                  Cr
                </span>
              </div>
              <NotificationComponent />
            </header>
            <Separator />
            <PlanComponent />
            <Separator />
            <button
              onClick={onClickSidebarShow}
              className="relative w-[3rem] lg:hidden opacity-70 hover:opacity-100 rounded min-h-[3rem] flex items-center bg-zinc-500 bg-opacity-10 justify-center p-3 "
            >
              <FaChevronRight />
            </button>
            <section className="flex flex-1 flex-col gap-2 w-full overflow-y-auto">
              <div className="flex flex-col mt-0 gap-2 py-4 relative flex-nowrap w-full p-2">
                {pages.map(
                  ({ name, icon: Icon, href }: Page, index: number) => {
                    const selected = currentPath === href.substring(1);
                    const selectedClass = selected
                      ? "bg-blue-50 dark:bg-zinc-200 hover:dark:bg-white text-black opacity-100"
                      : "transparent opacity-80 hover:dark:bg-zinc-800";

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
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", duration: 0.1 }}
                          className={`${selectedClass} rounded transition-[background] hover:bg-blue-50 flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-2 text-sm hover:opacity-100 p-1  `}
                        >
                          {Icon && <Icon size="21" className="min-w-[3rem]" />}
                          <span className="hidden lg:flex">{name}</span>
                        </S.LinkRoute>
                      </motion.div>
                    );
                  }
                )}
              </div>
              <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
              <div className="p-3 flex-1 w-full flex flex-col">
                {otherPages.map(({ name, href }: Page, index: number) => {
                  const selected = currentPath === href.substring(1);
                  const selectedClass = selected
                    ? "bg-zinc-100 dark:bg-zinc-800 opacity-100"
                    : "transparent opacity-80";
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
                        className={`${selectedClass} rounded hover:bg-zinc-100 hover:dark:bg-zinc-800 hover:dark:bg-zinc-800flex-nowrap w-full px-4 justify-center relative lg:justify-start flex py-2 items-center gap-2 text-sm hover:opacity-100 p-1  `}
                      >
                        <span className="hidden lg:flex">{name}</span>
                      </S.LinkRoute>
                    </motion.div>
                  );
                })}
              </div>
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
            </section>
          </Sidebar>
          <Sidebar
            animate={sidebarShow ? "open" : "hidden"}
            variants={variants}
            transition={{ duration: 0.4 }}
            className={`w-[100%] text-white max-h-[100%] z-[100] overflow-y-scroll fixed h-[100%] max-h-[100%] flex flex-col bg-zinc-900 ${fontOpenSans} w-[15rem]`}
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

          {/*    <header
            className="justify-between relative flex pl-2 h-auto items-center relative w-auto"
            style={{
              gridArea: "header",
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
          <Suspense fallback={<Loading />}>
            <S.Content>
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
