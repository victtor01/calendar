"use client";

import { NotificationComponent } from "./notification";
import { otherPages, pages } from "@/constants/linksPrivates";
import { motion } from "framer-motion";
import { FaChevronRight, FaCrown } from "react-icons/fa";
import { fontOpenSans } from "@/app/fonts";
import { usePathname } from "next/navigation";
import { RxExit } from "react-icons/rx";
import { useContext } from "react";
import { ThemeContext } from "@/app/(private)/layout";
import { Plan } from "./plan";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import * as S from "./style";

/* components */
import { Sidebar } from "@/components/sidebar";
import { useSessionContext } from "@/contexts/sessionContext";

export function SidebarRelativePrivate() {
  const { theme, handleTheme } = useContext(ThemeContext);
  const currentPath = usePathname().split("/")[1];
  const { logout } = useSessionContext();

  const IconTheme = theme === "dark" ? RiMoonLine : RiSunLine;

  return (
    <Sidebar
      bgTheme={false}
      style={{ gridArea: "sidebar" }}
      className={`w-[4rem] lg:w-[16rem] py-4 dark:bg-opacity-80 relative items-center lg:items-start flex flex-col font-semibold ${fontOpenSans}`}
    >
      <header className="w-full flex items-center py-2 mb-3 justify-between relative h-auto">
        <div className={`bg-transparent font-semibold text-md`}>
          <span className="hidden lg:flex z-20  dark:opacity-100 bg-indigo-500 rounded-xl text-white items-center justify-center w-12 h-12">
            Cr
          </span>
        </div>
        <NotificationComponent />
      </header>

      <Plan />

      <button
        onClick={() => null}
        className="relative w-[3rem] lg:hidden opacity-70 hover:opacity-100 rounded min-h-[3rem] flex items-center bg-zinc-500 bg-opacity-10 justify-center p-2 "
      >
        <FaChevronRight />
      </button>
      <section className="flex flex-1 flex-col gap-2 w-full overflow-y-auto scroll-none">
        <div className="flex font-normal flex-col mt-0 gap-1 py-4 relative flex-nowrap w-full ">
          {pages.map(({ name, icon: Icon, href }, index: number) => {
            const selected = currentPath === href.substring(1);
            const selectedClass = selected
              ? "opacity-100 text-indigo-600 dark:text-indigo-500 cursor-default"
              : "opacity-60 text-gray-800 cursor-pointer dark:text-gray-100";

            return (
              <S.LinkRoute
                key={index}
                href={href}
                $selected={!!selected}
                transition={{ type: "spring", duration: 0.1 }}
                className={`${fontOpenSans} ${selectedClass} before:bg-indigo-500  rounded flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-2  hover:opacity-100 p-1 font-bold`}
              >
                {Icon && <Icon size="21" className="min-w-[3rem]" />}
                <span className="hidden lg:flex">{name}</span>
              </S.LinkRoute>
            );
          })}
        </div>
        <S.Separator />
        <div className="p-3 flex-1 w-full flex flex-col">
          {otherPages.map(({ name, href }, index: number) => {
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
                  className={`${selectedClass} rounded hover:bg-zinc-100 hover:dark:bg-zinc-800 flex-nowrap w-full px-4 justify-center relative lg:justify-start flex py-2 items-center gap-2 text-sm hover:opacity-100 p-1  `}
                >
                  <span className="hidden lg:flex">{name}</span>
                </S.LinkRoute>
              </motion.div>
            );
          })}
        </div>
        <S.Separator />
        <footer className="flex flex-col text-sm">
          <button onClick={logout} className="p-3 flex items-center gap-3">
            <RxExit />
            <span className="hidden lg:flex">Logout</span>
          </button>
          <button onClick={handleTheme} className="p-3 flex items-center gap-3">
            <IconTheme />
            <span className="hidden lg:flex">
              Tema: {theme === "dark" ? "Escuro" : "Claro"}
            </span>
          </button>
        </footer>
        <button className="p-3 w-auto text-white transition-opacity shadow-xl shadow-red-600 hover:shadow-xl text-md py-4 opacity-60 hover:opacity-100 items-center justify-between flex bg-gradient-45 from-purple-600  to-blue-600 rounded-md">
          Ver o meu plano. <FaCrown size="20" />
        </button>
      </section>
    </Sidebar>
  );
}
