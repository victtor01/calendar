"use client";

import { useContext } from "react";
import { ThemeContext } from "@/contexts/publicThemeContext";
import * as S from "./style";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fontOpenSans } from "@/app/fonts";
import { Button } from "@nextui-org/react";

const titleAnimation = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export default function Poster() {
  const { handleTheme, theme } = useContext(ThemeContext);
  const IconTheme = theme === "DARK" ? RiMoonLine : RiSunLine;
  const router = useRouter();

  return (
    <S.Poster className="flex flex-col relative w-full h-[100vh] overflow-hidden bg-gradient-45 from-purple-800 to-cyan-500 top-0">
      <S.Bubble />
      <header className="z-[20] p-2 text-lg flex justify-between text-white">
        <S.ButtonTheme
          whileTap={{ scale: 0.8 }}
          className="bg-zinc-900 text-white p-3 rounded"
          onClick={handleTheme}
        >
          <IconTheme />
        </S.ButtonTheme>
      </header>
      <motion.section className="flex flex-col p-4 px-[5rem] gap-8 justify-center flex-1">
        <div className="flex gap-2 flex-col w-full max-w-[40rem]">
          <motion.h1
            initial="initial"
            animate="animate"
            variants={titleAnimation}
            transition={{ delay: 0.4 }}
            className={`text-5xl text-white font-sm ${fontOpenSans}`}
          >
            Organize seu Tempo, Finanças e Mais com Facilidade!
          </motion.h1>
          <motion.h2
            initial="initial"
            animate="animate"
            variants={titleAnimation}
            transition={{ delay: 0.6 }}
            className="flex text-white font-sm max-w-[30rem]"
          >
            Sua solução completa para organização pessoal e controle financeiro
            fácil. Simplifique sua vida agora!
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`flex gap-2 ${fontOpenSans}`}
        >
          <Button
            onClick={() => router.push("/")}
            className="bg-white text-zinc-900 p-6 px-10 rounded text-md font-semibold"
          >
            Saiba mais!
          </Button>
          <Button
            onClick={() => router.push("/register")}
            className="bg-transparent border border-white text-white p-6 px-10 rounded text-md font-semibold"
          >
            Começe aqui.
          </Button>
        </motion.div>
      </motion.section>
    </S.Poster>
  );
}
