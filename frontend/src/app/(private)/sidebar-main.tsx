import { otherPages, pages } from "@/constants/linksPrivates";
import { FaCrown } from "react-icons/fa";
import { fontFiraCode, fontOpenSans } from "@/app/fonts";
import { usePathname } from "next/navigation";
import { useContext } from "react";
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
      className={`w-[4rem] lg:w-[14rem] text-gray-800 z-20 dark:text-white  bg-white dark:bg-neutral-950  gap-4  relative items-center lg:items-start flex flex-col font-semibold ${fontOpenSans}`}
    >
      <S.Bubble className="opacity-5"/>
      <header className="w-full flex bg-transparent border-b dark:border-zinc-800 items-center lg:mb-0 lg:justify-between relative h-auto pt-0 lg:p-1 h-18 justify-center">
        <div
          className={` items-center text-md flex w-full gap-2 pointer-events-none`}
        >
          <div className="flex z-20 dark:opacity-100 text-indigo-600 rounded-xl items-center justify-center w-12 h-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1024.000000pt"
              height="1024.000000pt"
              viewBox="0 0 1024.000000 1024.000000"
              className="fill-indigo-600"
            >
              <path
                d="M3568 8151c-73-15-164-69-225-134-97-104-130-190-132-346-1-58-4-108-7-113-3-4-31-8-62-8-101 0-244-52-329-118-109-87-176-176-215-290l-23-67V5100c0-1086 4-1986 7-1999 41-137 69-194 142-288 61-78 148-145 241-185 87-37 102-41 211-55 71-10 3683-9 3737 1 104 17 222 72 315 146 112 89 215 268 237 411 10 60 10 3848 1 3924-5 38-24 94-52 153-35 75-57 107-111 160-38 37-87 80-110 96-63 42-201 86-283 90-39 2-72 5-74 7s-6 60-8 129c-3 115-6 130-36 193-39 85-132 183-210 225-128 68-292 67-432-1-61-30-150-121-181-187-37-78-50-142-52-261l-2-104H4125l-1 116c-2 159-31 240-122 340-111 120-270 171-434 140zm162-317c25-10 48-29 62-53 23-35 23-42 25-372 2-328 1-336-20-375-26-45-76-74-130-74-52 0-90 22-119 67-23 38-23 38-23 383v345l23 33c42 58 109 75 182 46zm2718-4c20-12 41-38 52-63 16-38 18-72 18-367-1-299-2-328-20-363-52-103-191-102-252 3-20 33-21 50-21 371v335l25 36c45 66 133 87 198 48zm656-1201c4-3 7-56 9-118 2-105 1-111-18-112-11-1-954-2-2095-3l-2075-1v117c-1 110 0 117 20 120 40 6 4153 3 4159-3zm1-500c2-3 5-127 6-275l2-271-79-75c-309-292-756-664-1032-859-145-101-202-140-312-213-247-163-522-321-796-459-173-88-177-89-196-69-9 9-55 53-103 97s-97 90-108 103c-12 12-27 20-35 17-7-2-11-1-7 4 3 5-41 51-97 102-57 51-224 204-373 340-148 135-313 285-365 333-52 47-100 86-106 86-9 0-198-192-470-478-96-100-101-104-106-79-6 32-6 1607 0 1659l4 37 57 3c91 5 4111 1 4116-3zm5-1088c0-137-2-162-17-179-43-48-317-286-412-357-15-11-65-51-112-90-99-82-99-82-294-223-294-212-565-388-745-485-30-16-65-36-77-43-41-25-117-67-212-115-108-56-87-61-209 55-39 38-72 75-72 81s30 26 68 44c599 293 1326 797 1887 1307 164 150 180 163 188 164 4 0 7-72 7-159zm0-700c0-127-3-152-17-169-15-17-163-143-273-231-66-53-194-151-251-191-35-25-82-60-106-78-47-35-503-337-549-363-16-9-78-47-139-84-60-37-130-77-156-90l-45-23-94 87c-53 50-90 92-86 99 3 6 19 17 34 25 467 240 1104 683 1589 1104 40 35 77 63 83 63s10-56 10-149z"
                transform="matrix(.1 0 0 -.1 0 1024)"
              />
              <path
                d="M4925 5729c-428-62-677-537-486-924 87-175 231-295 411-341 87-23 254-22 339 0 318 85 533 406 478 716-29 163-86 269-205 382-90 85-210 144-330 164-96 15-119 16-207 3z"
                transform="matrix(.1 0 0 -.1 0 1024)"
              />
            </svg>
          </div>
          <div className="text-lg px-2 text-indigo-600 hidden lg:flex font-semibold">
            <span className={fontFiraCode}>Calendar</span>
          </div>
        </div>
      </header>

      <section className="flex flex-1 flex-col  w-full overflow-y-auto scroll-none px-1 gap-4 lg:px-0">
        <div className="flex font-normal flex-col gap-1  relative flex-nowrap w-full">
          {pages.map(({ name, icon: Icon, href }, index: number) => {
            const selected = currentPath === href.substring(1);
            const selectedClass = selected
              ? "opacity-100 cursor-default bg-gradient-45 text-white from-purple-700 to-indigo-700"
              : "opacity-60 cursor-pointer dark:text-gray-200";

            return (
              <Link
                key={index}
                href={href}
                className={`${fontOpenSans} ${selectedClass} lg:px-4 flex-nowrap w-full justify-center relative lg:justify-start flex py-2 items-center gap-4 hover:opacity-100 font-semibold`}
              >
                {Icon && <Icon size="20" />}
                <span className="hidden lg:flex">{name}</span>
              </Link>
            );
          })}
        </div>

        <span className="w-full h-[1px] bg-gray-200 dark:bg-zinc-800 " />

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

      <span className="w-full h-[1px] bg-gray-200 dark:bg-zinc-800 " />

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
