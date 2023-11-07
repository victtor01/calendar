"use client";
import PrivateRoute from "@/components/privateRoute";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as S from "./style";
import { Sidebar } from "@/components/sidebar";
import { IconType } from "react-icons";
import {
  BsCalendarRange,
  BsFillCalendarRangeFill,
  BsFillGearFill,
  BsHouse,
} from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import Link from "next/link";
import { fontInter, fontOpenSans } from "../fonts";
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

const darkTheme = {
  primary: "rgb(24 24 27)",
  secundary: "#202020",
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
  border: "#d8d3d3",
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
  { name: "Configurações", icon: BsFillGearFill, href: "/clients" },
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

  return {
    theme,
    handleTheme,
    logout,
    sidebarShow,
    widthSidebar,
    onClickSidebarShow,
    IconTheme,
  };
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    logout,
    handleTheme,
    theme,
    widthSidebar,
    onClickSidebarShow,
    IconTheme,
  } = useLayout();

  return (
    <PrivateRoute>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <S.Container>
          <Sidebar
            style={{ gridArea: "sidebar" }}
            className={`z-50 w-[4rem] text-white relative overflow-hidden h-full items-center flex flex-col bg-gradient-to-b from-cyan-700 bg-gradient-opacity-20 to-cyan-900 ${fontOpenSans}`}
          >
            <div className="w-[4rem] h-[4rem] flex justify-center items-center rounded">
              LG
            </div>
            <button
              onClick={onClickSidebarShow}
              className="relative w-[3rem] opacity-70 hover:opacity-100 rounded h-[3rem] flex items-center bg-cyan-600 justify-center p-3 "
            >
              <FaChevronRight />
            </button>
            <div className="flex flex-col px-4 mt-5 gap-5 flex-1 flex-nowrap">
              {pages.map(({ name, icon: Icon, href }: Page) => {
                return (
                  <Link
                    key={name}
                    href={href}
                    className=" flex-nowrap flex items-center gap-2 text-lg opacity-80 hover:opacity-100 p-1 rounded"
                  >
                    <Icon size={"20"} className="min-w-[3rem]" />
                  </Link>
                );
              })}
            </div>
            <button onClick={handleTheme} className="p-6">
              <IconTheme />
            </button>
          </Sidebar>
          <Sidebar
            className={`w-[100%] text-white overflow-y-scroll ${widthSidebar} transition-[left] duration-500 absolute h-[100%] max-h-[100%] flex flex-col bg-gradient-to-b from-cyan-600 to-cyan-900 ${fontOpenSans} w-[15rem]`}
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
              <div className="w-full p-4 flex gap-5 items-center">
                <button
                  onClick={handleTheme}
                  className="opacity-60 hover:opacity-100"
                >
                  <IconTheme size="20" />
                </button>
                <button onClick={logout}>
                  <RxExit size="20" className="opacity-60 hover:opacity-100" />
                </button>
              </div>
            </div>
          </Sidebar>
          <Suspense fallback={<Loading />}>
            <S.Content>
              {/* <div className="absolute top-0 translate-x-[-50%] left-[50%] p-3 bg-zinc-600 z-20">
                  sef
              </div> */}
              {children}
            </S.Content>
          </Suspense>
        </S.Container>
      </ThemeProvider>
    </PrivateRoute>
  );
}
