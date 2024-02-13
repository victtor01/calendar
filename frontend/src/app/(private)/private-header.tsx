"use client";

import { SessionContext } from "@/contexts/sessionContext";
import { ThemeContext } from "@/contexts/themeContext";
import { useContext } from "react";
import { BiSolidExit } from "react-icons/bi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { TbSunFilled } from "react-icons/tb";
import { fontInter } from "../fonts";

const HeaderPrivate = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { logout } = useContext(SessionContext);

  const IconTheme = theme === "dark" ? BsFillMoonStarsFill : TbSunFilled;

  return (
    <header
      className="p-2 justify-between flex h-auto bg-zinc-950 dark:border-zinc-800 border-b shadow-md text-white items-center z-40"
      style={{ gridArea: "header" }}
    >
      <div className="flex gap-3">
        <div className="text-white font-semibold text-gray-100">
          <span className={fontInter}>NOME EMPRESA</span>
        </div>
      </div>
      <div className="flex gap-2 text-gray-200">
        <button
          onClick={handleTheme}
          className="p-3 rounded-lg hover:bg-zinc-100 hover:bg-opacity-10"
        >
          <IconTheme size="18" />
        </button>
        <button
          onClick={logout}
          className="p-3 rounded-lg hover:bg-zinc-100 hover:bg-opacity-10"
        >
          <BiSolidExit size="20" />
        </button>
      </div>
    </header>
  );
};

export { HeaderPrivate };
