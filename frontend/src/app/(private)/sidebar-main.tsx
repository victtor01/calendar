import { otherPages, pages } from "@/constants/linksPrivates";
import { FaCrown, FaSearch } from "react-icons/fa";
import { fontOpenSans } from "@/app/fonts";
import { usePathname } from "next/navigation";
import * as S from "./style";

/* components */
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";

export function SidebarRelative() {
  const currentPath = usePathname().split("/")[1];

  return (
    <Sidebar
      bgTheme={false}
      style={{ gridArea: "sidebar" }}
      className={`w-[4rem] lg:w-[15rem] text-gray-800 shadow-gray-400 m-2 rounded-md shadow-md dark:shadow-black dark:from-zinc-900 dark:to-zinc-950 bg-gradient-45 from-zinc-50 to-blue-50 z-20 dark:text-white  relative items-center lg:items-start flex flex-col font-semibold ${fontOpenSans}`}
    >
      <header className="w-full hidden lg:flex dark:border-zinc-800 lg:p-2 items-center lg:mb-0 lg:justify-between relative h-auto pt-0 h-18 justify-center">
        <div className={` items-center text-md flex w-full gap-0 `}>
          <label
            htmlFor="search"
            className="flex overflow-hidden bg-gray-50 dark:bg-zinc-800 rounded"
          >
            <button className="p-3 text-gray-500">
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Pesquise por algo..."
              className="bg-transparent placeholder:font-normal placeholder:text-gray-400 font-semibold outline-none px-2"
            />
          </label>
        </div>
      </header>

      <span className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-600 to-transparent hidden lg:flex" />

      <section className="flex flex-1 flex-col  w-full overflow-y-auto scroll-none gap-4">
        <div className="flex font-normal flex-col gap-1  relative flex-nowrap w-full p-2">
          {pages.map(({ name, icon: Icon, href }, index: number) => {
            const selected = currentPath === href.substring(1);
            const selectedClass = selected
              ? "opacity-100 cursor-default text-black dark:text-white lg:translate-x-4 "
              : "opacity-80 cursor-pointer dark:text-gray-200";

            return (
              <Link
                key={index}
                href={href}
                className={`${fontOpenSans} ${selectedClass} lg:px-4 flex-nowrap w-full transition-all rounded text-md justify-center relative lg:justify-start flex py-2 items-center gap-4 hover:opacity-100 font-semibold`}
              >
                {Icon && <Icon size="18" />}
                <span className="hidden lg:flex">{name}</span>
              </Link>
            );
          })}
        </div>

        <span className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-600 to-transparent hidden lg:flex" />

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

      <footer className="flex flex-col gap-4 w-full lg:p-1">
        <span className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-600 to-transparent" />
        <button
          className={`bg-white dark:bg-zinc-900 border-animation-gradient p-3 lg:m-0 lg:px-5 w-auto flex-col text-normal transition-all shadow-2xl hover:shadow-xl text-md py-4 justify-center flex rounded`}
        >
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
