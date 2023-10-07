"use client";
import PrivateRoute from "@/components/privateRoute";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as S from "./style";
import { Sidebar } from "@/components/sidebar";
import { IconType } from "react-icons";
import { BsFillCalendarRangeFill, BsFillGearFill } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";
import Link from "next/link";
import { fontOpenSans } from "../fonts";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiSolidGroup } from "react-icons/bi";
import Button from "@/components/button";
import { ThemeProvider } from "styled-components";
import { RxExit } from "react-icons/rx";

const darkTheme = {
  primary: "#121212",
  secundary: "#181717",
  text: "#ebe8e8",
  success: "#0f0",
  error: "#f00",
  lightPurple: "#4B0082",
  darkPurple: "#5a0f8f",
  linearPurple: "",
  darkBlue: "#3d6bcd",
  lightBlue: "#437fff",
  border: "#3e3e3e",
};

const lightTheme = {
  primary: "#eceef0",
  secundary: "aliceblue",
  text: "#000",
  success: "",
  error: "",
  lightPurple: "",
  darkPurple: "",
  linearPurple: "",
  border: "#d8d3d3",
};
interface Page {
  name: string;
  href: string;
  icon: IconType;
}

const pages: Page[] = [
  { name: "Calendar", icon: BsFillCalendarRangeFill, href: "/calendar" },
  { name: "Finance", icon: FiTrendingUp, href: "/finance" },
  { name: "Clientes", icon: BiSolidGroup, href: "" },
];

const useLayout = () => {
  const router = useRouter();
  const [sidebarShow, setSidebarShow] = useState(false);
  const [theme, setTheme] = useState<string>("light");
  const widthSidebar = sidebarShow ? "left-[-100%]" : "left-0";

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
    logout,
    sidebarShow,
    widthSidebar,
    onClickSidebarShow,
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, theme, widthSidebar, onClickSidebarShow } = useLayout();

  return (
    <PrivateRoute>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <S.Container>
          <Sidebar
            className={`w-[4rem] text-white relative min-h-screen items-center flex flex-col bg-cyan-500 bg-gradient-to-b from-cyan-500 to-cyan-700 ${fontOpenSans}`}
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
          </Sidebar>
          <Sidebar
            className={`w-[100%] text-white ${widthSidebar} transition-[left] duration-500 absolute min-h-screen flex flex-col bg-cyan-500 bg-gradient-to-b from-cyan-500 to-cyan-700 ${fontOpenSans} w-[15rem]`}
          >
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="p-6 gap-1 text-xl font-semibold flex-nowrap flex justify-between">
                <div>Olá, Victor</div>
                <div>LD</div>
              </header>
              <div className="flex flex-col px-4 mt-5 gap-5 flex-1 flex-nowrap">
                {pages.map(({ name, icon: Icon, href }: Page) => {
                  return (
                    <Link
                      key={name}
                      href={href}
                      className=" flex-nowrap flex items-center gap-2 text-lg opacity-80 hover:opacity-100 p-1 rounded"
                    >
                      <Icon size={"20"} className="min-w-[3rem]" />
                      {name}
                    </Link>
                  );
                })}
              </div>
              <div className="w-full p-4 flex gap-2 py-5 items-center">
                <Link href={""}>
                  <BsFillGearFill size="25" />
                </Link>
                <Button onClick={logout}>
                  <RxExit size="25" />
                </Button>
              </div>
            </div>
            <button
              onClick={onClickSidebarShow}
              className="absolute w-[3rem] shadow-lg h-[3rem] flex items-center bg-cyan-600 justify-center right-0 top-[10rem] p-3 translate-x-[50%] rounded-[100%]"
            >
              <FaChevronLeft />
            </button>
          </Sidebar>
          <S.Content>{children}</S.Content>
        </S.Container>
      </ThemeProvider>
    </PrivateRoute>
  );
}