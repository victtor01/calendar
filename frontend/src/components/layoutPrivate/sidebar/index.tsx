"use client";

import { NotificationComponent } from "./notification";
import { otherPages, pages } from "@/constants/linksPrivates";
import { motion } from "framer-motion";
import { FaChevronRight, FaCrown } from "react-icons/fa";
import { fontOpenSans } from "@/app/fonts";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { Plan } from "./plan";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import * as S from "./style";

/* components */
import { Sidebar } from "@/components/sidebar";
import { useSessionContext } from "@/contexts/sessionContext";
import { ThemeContext } from "@/contexts/themeContext";

export function SidebarRelativePrivate() {
  const { theme, handleTheme } = useContext(ThemeContext);
  const currentPath = usePathname().split("/")[1];
  const { logout } = useSessionContext();

  const IconTheme = theme === "dark" ? RiMoonLine : RiSunLine;

  return (
    <Sidebar
      bgTheme={false}
      style={{ gridArea: "sidebar" }}
      className={`w-[4rem] lg:w-[16rem] text-white bg-zinc-950 dark:bg-neutral-950 dark:border dark:border-zinc-900 gap-3 p-6 rounded-3xl relative items-center lg:items-start flex flex-col font-semibold ${fontOpenSans}`}
    >
      <header className="w-full flex items-center mb-4 justify-between relative h-auto">
        <div
          className={`bg-transparent font-semibold items-center text-md flex justify-center gap-2`}
        >
          <span className="hidden lg:flex z-20  dark:opacity-100 bg-indigo-600 rounded-2xl text-white items-center justify-center w-12 h-12">
            Cr
          </span>
          <span className="text-xl  dark:text-gray-100">TCalendar</span>
        </div>
      </header>

      {/* <NotificationComponent /> */}
      {/* <Plan /> */}

      <button
        onClick={() => null}
        className="relative w-[3rem] lg:hidden opacity-70 hover:opacity-100 rounded min-h-[3rem] flex items-center bg-zinc-500 bg-opacity-10 justify-center p-2 "
      >
        <FaChevronRight />
      </button>

      <span className="w-full h-[1px] bg-gradient-to-l from-transparent via-zinc-800 to-transparent " />

      <section className="flex flex-1 flex-col gap-2 w-full overflow-y-auto scroll-none">
        <div className="flex font-normal  flex-col gap-1 mt-2 relative flex-nowrap w-full ">
          {pages.map(({ name, icon: Icon, href }, index: number) => {
            const selected = currentPath === href.substring(1);
            const selectedClass = selected
              ? "opacity-100 cursor-default text-indigo-600 px-1"
              : "opacity-60 cursor-pointer dark:text-gray-200";

            return (
              <S.LinkRoute
                whileTap={{ scale: 0.93 }}
                key={index}
                href={href}
                $selected={false}
                transition={{ type: "spring", duration: 0.1 }}
                className={`${fontOpenSans} ${selectedClass} transition-all before:bg-indigo-500  rounded flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-5 hover:opacity-100 font-semibold`}
              >
                {Icon && <Icon size="22" />}
                <span className="hidden lg:flex">{name}</span>
              </S.LinkRoute>
            );
          })}
        </div>

        <span className="w-full h-[1px] bg-gradient-to-l from-transparent via-zinc-800 to-transparent " />

        <div className="flex-1 w-full flex flex-col">
          {otherPages.map(({ name, href }, index: number) => {
            const selected = currentPath === href.substring(1);
            const selectedClass = selected
              ? "opacity-100 cursor-default"
              : "opacity-60 cursor-pointer dark:text-gray-200";

            return (
              <S.LinkRoute
                key={index}
                href={href}
                $selected={false}
                transition={{ type: "spring", duration: 0.1 }}
                className={`${fontOpenSans} ${selectedClass}  before:bg-indigo-500 text-sm rounded flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-2 hover:opacity-100 font-bold`}
              >
                <span className="hidden lg:flex">{name}</span>
              </S.LinkRoute>
            );
          })}
        </div>

        <footer className="flex flex-col gap-4 ">
          <button className="p-3 px-5 w-auto flex-col text-normal text-white transition-opacity shadow-2xl  hover:shadow-xl text-md py-4 dark:opacity-60 opacity-80 hover:dark:opacity-100 hover:opacity-100 justify-center flex bg-gradient-45 from-purple-600  to-blue-600 rounded-xl">
            <div className="flex gap-3 w-full justify-between">
              Meu plano. <FaCrown size="20" />
            </div>
            <p className="text-xs font-normal">Saíba mais.</p>
          </button>
        </footer>
      </section>
    </Sidebar>
  );
}
