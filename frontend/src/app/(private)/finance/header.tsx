
import * as S from "./style";
import { AnimatePresence, motion } from "framer-motion";
import { MdFilterList } from "react-icons/md";
import { GoSearch } from "react-icons/go";

export const Header = () => {
  return (
    <header className="relative flex p-2 items-center justify-between rounded">
      <S.Bubble />
      <div className="z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <AnimatePresence>
            <motion.button className="p-0 rounded-md items-center p-3 px-4 opacity-70 hover:opacity-100 flex gap-3 bg-cyan-500 text-white">
              <MdFilterList size="20" />
              <span>Filtrar</span>
            </motion.button>
          </AnimatePresence>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-3 items-center w-auto backdrop-blur-md"
      >
        <input className="focus:shadow rounded-lg w-full outline-none  transition-shadow border-none p-3 bg-zinc-400 bg-opacity-10" />
        <button className="w-[4rem] h-[3rem] rounded-md opacity-70 hover:opacity-80 bg-cyan-400 items-center justify-center flex">
          <GoSearch size="20" className="text-white" />
        </button>
      </motion.div>
    </header>
  );
};
