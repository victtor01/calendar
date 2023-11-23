"use client";

import PrivateRoute from "@/components/privateRoute";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as S from "./style";
import { Sidebar } from "@/components/sidebar";
import { IconType } from "react-icons";
import { BsCalendarRange, BsFillGearFill, BsHouse } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import Link from "next/link";
import { fontOpenSans, fontRoboto, fontValela } from "../fonts";
import { Suspense, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiSolidGroup } from "react-icons/bi";
import Button from "@/components/button";
import { ThemeProvider } from "styled-components";
import { RxExit } from "react-icons/rx";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { PiSuitcaseSimple } from "react-icons/pi";
import Loading from "@/components/loading";
import Header from "@/components/header";
import UserComponents from "@/components/userComponents";
import Image from "next/image";

/* #1f1d2b */

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

interface Page {
  name: string;
  href: string;
  icon: IconType;
}

const pages: Page[] = [
  { name: "Home", icon: BsHouse, href: "/home" },
  { name: "Calendar", icon: BsCalendarRange, href: "/calendar" },
  { name: "Finance", icon: FiTrendingUp, href: "/finance" },
  { name: "Clientes", icon: BiSolidGroup, href: "/clients" },
  { name: "Serviços", icon: PiSuitcaseSimple, href: "/services" },
  { name: "Configure", icon: BsFillGearFill, href: "/configurations" },
];

const useLayout = () => {
  const router = useRouter();
  const [sidebarShow, setSidebarShow] = useState(false);
  const [theme, setTheme] = useState<string>("light");
  const widthSidebar = !sidebarShow ? "left-[-120%]" : "left-0";

  const handleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const IconTheme = theme === "dark" ? RiMoonLine : RiSunLine;

  const onClickSidebarShow = () => {
    setSidebarShow((prev) => !prev);
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("adminRote");
    router.push("/login");
  };

  const currentPath = usePathname().split("/")[1];

  return {
    theme,
    handleTheme,
    logout,
    sidebarShow,
    widthSidebar,
    onClickSidebarShow,
    currentPath,
    IconTheme,
  };
};

const variants = {
  open: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    left: "0%",
  },
  hidden: {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
    left: "-100%",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    onClickSidebarShow,
    handleTheme,
    logout,
    currentPath,
    sidebarShow,
    IconTheme,
    theme,
  } = useLayout();

  return (
    <PrivateRoute>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <S.Container>
          <Sidebar
            bgTheme
            style={{ gridArea: "sidebar" }}
            className={`w-[4rem] lg:w-[13rem] m-1 rounded-md relative overflow-x-hidden overflow-y-auto items-center lg:items-start flex flex-col font-semibold ${fontOpenSans}`}
          >
            <S.Bubble />
            <div className="w-full h-[4rem] flex justify-center items-center rounded ">
              <Header.Division
                bgTheme={false}
                className={
                  "flex-none p-2 m-2 bg-transparent font-semibold text-md opacity-50" +
                  ` ${fontRoboto}`
                }
              >
                <div>
                  <Image
                    src="/logo3.png"
                    className="rounded-full"
                    width={40}
                    height={40}
                    alt="image-logo"
                  />
                </div>
                <span className="hidden lg:flex">CalendarUD</span>
              </Header.Division>
            </div>
            <button
              onClick={onClickSidebarShow}
              className="relative w-[3rem] lg:hidden opacity-70 hover:opacity-100 rounded min-h-[3rem] flex items-center bg-cyan-600 justify-center p-3 "
            >
              <FaChevronRight />
            </button>
            <div className="flex flex-col px-4 mt-5 gap-5 flex-1 flex-nowrap">
              {pages.map(({ name, icon: Icon, href }: Page) => {
                const selected = currentPath === href.substring(1);
                return (
                  <Link
                    key={name}
                    href={href}
                    className={`flex-nowrap flex items-center gap-2 text-md opacity-80 hover:opacity-100 p-1 rounded transition-all ${
                      selected ? "text-cyan-500 gap-5" : ""
                    }`}
                  >
                    <Icon size={"18"} className="min-w-[3rem]" />
                    <span className="hidden lg:flex">{name}</span>
                  </Link>
                );
              })}
            </div>
            <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
            <button onClick={logout} className="p-4 flex items-center gap-3">
              <RxExit />
              <span className="hidden lg:flex">Logout</span>
            </button>
            <button
              onClick={handleTheme}
              className="p-4 flex items-center gap-3"
            >
              <IconTheme />
              <span className="hidden lg:flex">
                Tema: {theme === "dark" ? "Escuro" : "Claro"}
              </span>
            </button>
          </Sidebar>
          <Sidebar
            animate={sidebarShow ? "open" : "hidden"}
            variants={variants}
            transition={{ duration: 0.4 }}
            className={`w-[100%] text-white max-h-[100%] overflow-y-scroll absolute h-[100%] max-h-[100%] flex flex-col bg-gradient-to-b from-cyan-600 to-cyan-900 ${fontOpenSans} w-[15rem]`}
          >
            <div className="flex flex-col flex-1">
              <header className="p-3 gap-1 text-xl font-semibold flex-nowrap flex justify-between items-center">
                <div>Olá, Victor</div>
                <div>
                  <Button
                    onClick={onClickSidebarShow}
                    className="relative w-[3rem] opacity-70 hover:opacity-100 rounded h-[3rem] flex items-center bg-cyan-600 justify-center p-3 "
                  >
                    <FaChevronLeft />
                  </Button>
                </div>
              </header>
              <div className="flex flex-col px-4 mt-5 gap-5 flex-1 flex-nowrap">
                {pages.map(
                  ({ name, icon: Icon, href }: Page, index: number) => {
                    return (
                      <Link
                        key={index}
                        href={href}
                        className=" flex-nowrap flex items-center gap-2 text-lg opacity-80 hover:opacity-100 p-1 rounded"
                      >
                        <Icon size={"20"} className="min-w-[3rem]" />
                        {name}
                      </Link>
                    );
                  }
                )}
              </div>
              <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
              <button
                onClick={handleTheme}
                className="p-4 flex items-center gap-3"
              >
                <RxExit />
                <span className="flex">Logout</span>
              </button>
              <button onClick={logout} className="p-4 flex items-center gap-3">
                <IconTheme />
                <span className="flex">
                  Tema: {theme === "dark" ? "Escuro" : "Claro"}
                </span>
              </button>
            </div>
          </Sidebar>
          <Header.Root
            className="justify-between m-1 relative overflow-hidden rounded-md w-auto "
            style={{
              width: "100%",
              border: "none",
            }}
          >
            <span className="absolute p-3 bg-gradient-45 from-[#6157FF] via-[#74FEBD] from-10% to-80% blur-2xl opacity-20 shadow-purple-500 to-transparent bg-opacity-50 h-full w-[50%] z-[-1] transform -skew-x-[-26deg] left-[-20px]" />
            <Header.Division
              bgTheme={false}
              className={
                "flex-none p-2 mx-2 rounded-md font-bold text-lg" +
                ` ${fontValela}`
              }
            >
              Olá, Victor!
            </Header.Division>
            <Header.Division className="flex-none rounded-full">
              <UserComponents />
            </Header.Division>
          </Header.Root>
          <Suspense fallback={<Loading />}>
            <S.Content>{children}</S.Content>
          </Suspense>
        </S.Container>
      </ThemeProvider>
    </PrivateRoute>
  );
}
