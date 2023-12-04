import { IoMdExit, IoMdNotificationsOutline } from "react-icons/io";
import Button from "../button";
import { fontInter, fontRoboto } from "@/app/fonts";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import * as S from "./style";
import { useSessionContext } from "@/contexts/sessionContext";
import { motion } from "framer-motion";

type Select = "NOTIFICATION" | "EXIT" | "USER" | null;

export default function UserComponents() {
  const [selected, setSelected] = useState<Select>(null);
  const handleSelected = (value: Select) =>
    setSelected((prev: Select) => {
      return prev === value ? null : value;
    });
  const { logout } = useSessionContext();

  return (
    <div className={`flex gap-2 p-2 items-center gap-3 relative ${fontRoboto}`}>
      <Button
        onClick={() => handleSelected("NOTIFICATION")}
        className={`flex p-2 rounded-full h-10 w-10 items-center gap-2 justify-center ${
          selected === "NOTIFICATION" ? "bg-cyan-500 text-white" : "transparent"
        } transition-background`}
      >
        <IoMdNotificationsOutline size="20" />
      </Button>
      <Button
        onClick={() => handleSelected("EXIT")}
        className={`flex p-2 rounded-full justify-center h-10 w-10 items-center gap-2 ${
          selected === "EXIT" ? "bg-cyan-500 text-white" : "transparent"
        } transition-background`}
      >
        <IoMdExit size="20" />
      </Button>
      <Button className="flex bg-cyan-500 relative h-10 w-10 items-center overflow-hidden rounded-full">
        <Image
          src={"/persson2.jpg"}
          fill
          objectFit={"cover"}
          alt="imagen-perfil"
        />
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
  );
}
