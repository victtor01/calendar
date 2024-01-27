import { otherPages, pages } from "@/constants/linksPrivates";
import { FaChevronRight, FaCrown } from "react-icons/fa";
import { fontOpenSans } from "@/app/fonts";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import * as S from "./style";

/* components */
import { Sidebar } from "@/components/sidebar";
import { ThemeContext } from "@/contexts/themeContext";
import Link from "next/link";

export function SidebarRelativePrivate() {
  const { theme } = useContext(ThemeContext);
  const currentPath = usePathname().split("/")[1];

  return (
    <Sidebar
      bgTheme={false}
      style={{ gridArea: "sidebar" }}
      className={`w-[4rem] lg:w-[15rem]  text-white m-2 rounded-2xl border border-transparent border-zinc-900 bg-neutral-950  gap-4  relative items-center lg:items-start flex flex-col font-semibold ${fontOpenSans}`}
    >
      <header className="w-full flex items-center lg:mb-0 lg:justify-between relative h-auto pt-0 lg:pt-4 lg:px-2 justify-center">
        <div
          className={`bg-transparent font-semibold items-center text-md flex justify-center gap-2`}
        >
          <span className="flex z-20  dark:opacity-100 bg-indigo-600 rounded-xl text-white items-center justify-center w-12 h-12">
            Cr
          </span>
          <span className="text-xl  dark:text-gray-100 hidden lg:flex">
            TCalendar
          </span>
        </div>
      </header>

      {/* <button
        onClick={() => null}
        className="relative w-[3rem] lg:hidden opacity-70 hover:opacity-100 rounded min-h-[3rem] flex items-center bg-zinc-500 bg-opacity-10 justify-center p-2 "
      >
        <FaChevronRight />
      </button> */}

      <span className="w-full h-[1px] bg-zinc-800 " />

      <section className="flex flex-1 flex-col  w-full overflow-y-auto scroll-none px-1 gap-4 lg:px-0">
        <div className="flex font-normal flex-col gap-1  relative flex-nowrap w-full px-2">
          {pages.map(({ name, icon: Icon, href }, index: number) => {
            const selected = currentPath === href.substring(1);
            const selectedClass = selected
              ? "opacity-100 cursor-default bg-gradient-45 from-purple-700 to-indigo-700"
              : "opacity-60 cursor-pointer dark:text-gray-200";

            return (
              <Link
                key={index}
                href={href}
                className={`${fontOpenSans} ${selectedClass} lg:px-2 rounded-md flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-4 hover:opacity-100 font-semibold`}
              >
                {Icon && <Icon size="20" />}
                <span className="hidden lg:flex">{name}</span>
              </Link>
            );
          })}
        </div>

        <span className="w-full h-[1px] bg-zinc-800 " />

        <div className="flex-1 w-full flex-col lg:flex hidden mt-4 ">
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
                className={`${fontOpenSans} ${selectedClass} px-4 transition-all  text-sm rounded flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-5 hover:opacity-100 font-semibold`}
              >
                <span className="hidden lg:flex">{name}</span>
              </S.LinkRoute>
            );
          })}
        </div>
      </section>

      <span className="w-full h-[1px] bg-zinc-800 " />
      
      <footer className="flex flex-col gap-4 w-full lg:p-3">
        <button className="p-3 lg:m-0lg:px-5 w-auto flex-col text-normal text-white transition-opacity shadow-2xl  hover:shadow-xl text-md py-4 dark:opacity-60 opacity-80 hover:dark:opacity-100 hover:opacity-100 justify-center flex bg-gradient-45 from-purple-600  to-blue-600 rounded">
          <div className="flex gap-3 w-full  justify-center lg:justify-between">
            <span className="hidden lg:flex">Meu plano.</span>
            <FaCrown size="20" />
          </div>
          <p className="text-xs font-normal hidden lg:flex">Saíba mais.</p>
        </button>
      </footer>
    </Sidebar>
  );
}
