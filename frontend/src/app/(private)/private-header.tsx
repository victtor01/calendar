"use client";

import { SessionContext } from "@/contexts/sessionContext";
import { ThemeContext } from "@/contexts/themeContext";
import { useContext } from "react";
import { BiSolidExit } from "react-icons/bi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { TbSunFilled } from "react-icons/tb";
import { fontInter } from "../fonts";

const HeaderPrivate = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { logout } = useContext(SessionContext);

  const IconTheme = theme === "dark" ? BsFillMoonStarsFill : TbSunFilled;

  return (
    <header
      className="p-2 justify-between flex h-auto mt-2 mr-2 rounded-md bg-white dark:bg-zinc-950 shadow text-gray-600 dark:text-gray-100 items-center z-40"
      style={{ gridArea: "header" }}
    >
      <div className="flex gap-3">
        <div className="font-semibold text-sm px-3">
          <span className={fontInter}>NOME EMPRESA</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleTheme}
          className="p-2 rounded-lg hover:bg-zinc-100 hover:bg-opacity-10"
        >
          <IconTheme size="18" />
        </button>
        <button
          onClick={logout}
          className="p-2 rounded-lg hover:bg-zinc-100 hover:bg-opacity-10"
        >
          <BiSolidExit size="20" />
        </button>
      </div>
    </header>
  );
};

export { HeaderPrivate };
