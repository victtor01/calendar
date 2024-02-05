"use client";

import { SessionContext } from "@/contexts/sessionContext";
import { ThemeContext } from "@/contexts/themeContext";
import { useContext } from "react";
import { BiSolidExit } from "react-icons/bi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { TbSunFilled } from "react-icons/tb";

const HeaderPrivate = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { logout } = useContext(SessionContext);

  const IconTheme = theme === "dark" ? BsFillMoonStarsFill : TbSunFilled;

  return (
    <header
      className="p-2 shadow justify-between flex pr-4 h-auto z-30 bg-zinc-50 text-black dark:bg-zinc-900 dark:text-gray-100 items-center"
      style={{ gridArea: "header" }}
    >
      <div className="flex gap-3">
        <label
          htmlFor="search"
          className="flex border rounded-md overflow-hidden dark:border-zinc-800"
        >
          <button className="p-3">
            <FaSearch />
          </button>
          <input
            type="text"
            className="bg-zinc-100 dark:bg-zinc-800 outline-none px-3"
          />
        </label>
      </div>
      <div className="flex gap-2 ">
        <button
          onClick={handleTheme}
          className="p-3 rounded-lg hover:bg-zinc-100  hover:dark:bg-zinc-700"
        >
          <IconTheme size="18" />
        </button>
        <button
          onClick={logout}
          className="p-3 rounded-lg hover:bg-zinc-100  hover:dark:bg-zinc-700"
        >
          <BiSolidExit size="20" />
        </button>
      </div>
    </header>
  );
};

export { HeaderPrivate };
