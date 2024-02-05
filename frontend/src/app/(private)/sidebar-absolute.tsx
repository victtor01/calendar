import { useAtom } from "jotai";
import { sidebarOpenState } from "@/states/private-layout-state";
import { Sidebar } from "@/components/sidebar";
import { fontOpenSans, fontRoboto } from "../fonts";
import { otherPages, pages } from "@/constants/linksPrivates";
import { useSessionContext } from "@/contexts/sessionContext";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import * as S from "./style";
import { RxExit } from "react-icons/rx";

const variants = {
  open: {
    left: "0%",
  },
  hidden: {
    left: "-100%",
  },
};

const SidebarAbsolute = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenState);
  const currentPath = usePathname().split("/")[1];
  const { userInfo, logout } = useSessionContext();

  return (
    <Sidebar
      animate={sidebarOpen ? "open" : "hidden"}
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
          <button onClick={() => setSidebarOpen((prev) => !prev)}>
            fechar
          </button>
        </div>
      </header>
      <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
      <div className="p-3 px-5 flex-col flex gap-1">
        <span className="text-sm">{userInfo?.firstName}</span>
        <span className="text-xs">
          Ver o meu{" "}
          <strong className="font-semibold text-purple-600">Plano!</strong>
        </span>
      </div>
      <span className="w-full h-[1px] bg-zinc-500 bg-opacity-30" />
      <div className="flex flex-col mt-0 gap-1 relative flex-nowrap w-full p-2">
        {pages.map(({ name, icon: Icon, href }, index: number) => {
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
      </footer>
    </Sidebar>
  );
};

export { SidebarAbsolute }