import { IoMdExit, IoMdNotifications } from "react-icons/io";
import Button from "../button";
import { fontInter, fontRoboto, fontValela } from "@/app/fonts";
import { useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SessionContext } from "@/contexts/sessionContext";
import { motion } from "framer-motion";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import * as S from "./style";
import { ThemeContext } from "@/contexts/themeContext";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import moment from "moment";

type Select = "NOTIFICATION" | "EXIT" | "USER" | null;
moment.locale(); 

export default function UserComponents() {
  const { theme, handleTheme } = useContext(ThemeContext);
  const [selected, setSelected] = useState<Select>(null);
  const { logout } = useContext(SessionContext);

  const handleSelected = (value: Select) =>
    setSelected((prev: Select) => {
      return prev === value ? null : value;
    });

  const IconTheme = theme === "dark" ? RiMoonLine : RiSunLine;

  return (
    <header
      className="justify-between  bg-transparent flex  h-auto items-center top- w-auto m-1 rounded-xl z-[10]"
      style={{
        width: "auto",
      }}
    >
      <div
        className={`flex gap-1 font-semibold text-lg items-center dark:bg-neutral-900 bg-white rounded-lg overflow-hidden`}
      >
        <span className="flex justify-center items-center w-12 border-r h-full">
          <PiMagnifyingGlassBold size="22" className="opacity-50 h-full" />
        </span>
        <input type="text" className="p-3 outline-none bg-transparent" placeholder="Pesquise por algo..."/>
      </div>

      <div className={`flex  items-center gap-3 relative ${fontRoboto}`}>
        <Button onClick={handleTheme} className="p-3 bg-white rounded-lg hover:opacity-100 opacity-60 dark:bg-zinc-800">
          <IconTheme size="20" />
        </Button>
        <Button onClick={() => handleSelected("NOTIFICATION")} className="p-3 bg-white rounded-lg hover:opacity-100 opacity-60 dark:bg-zinc-800">
          <IoMdNotifications size="20" />
        </Button>
        <Button onClick={() => handleSelected("EXIT")} className="p-3 bg-white rounded-lg hover:opacity-100 opacity-60 dark:bg-zinc-800">
          <IoMdExit size="20" />
        </Button>

        <AnimatePresence>
          {selected === "NOTIFICATION" && (
            <S.Modal
              key={"modal-notification"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", duration: 0.2 }}
              className="absolute p-3 top-[101%] right-0 flex flex-col m-3 w-[20rem] h-[24rem] rounded shadow z-[20]"
            >
              <div className="flex m-auto">Nenhuma notificação</div>
            </S.Modal>
          )}
          {selected === "EXIT" && (
            <S.Modal
              key={"modal-Exit"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", duration: 0.2 }}
              className="absolute p-3 top-[101%] right-0 m-3 w-[15rem] h-auto flex-col gap-1 flex rounded shadow z-[20]"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`text-md opacity-90 ${fontInter}`}
              >
                Deseja realmente sair da sessão?
              </motion.div>
              <button
                onClick={logout}
                className="bg-gradient-45 from-rose-700 to-red-500 p-2 rounded-md opacity-60 text-white hover:opacity-100"
              >
                Sair
              </button>
            </S.Modal>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
