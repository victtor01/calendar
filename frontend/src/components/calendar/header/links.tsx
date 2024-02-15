'use client';

import { BsCalendar2Week } from "react-icons/bs";
import { IoHome, IoList } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = {
  week: {
    icon: BsCalendar2Week,
    path: "/calendar/week",
    name: "Todo",
  },
  home: {
    icon: IoHome,
    path: "/calendar",
    name: "Home",
  },
  list: {
    icon: IoList,
    path: "/calendar/list",
    name: "Lista",
  },
};

export const Links = () => {
  const pathName = usePathname();

  return Object.entries(links).map(([key, value]: any, index: number) => {
    const Icon = value.icon;
    const selected = pathName === value.path;
    const selectedClass = selected
      ? "bg-zinc-700 opacity-100 text-white"
      : "hover:bg-zinc-800 opacity-80 hover:opacity-100";

    return (
      <Link
        href={value.path}
        key={key}
        className={`h-12 w-auto px-4 gap-2 text-md font-semibold capitalize rounded-md flex justify-center  items-center relative ${selectedClass}`}
      >
        <Icon size="20" />
        {value.name}
      </Link>
    );
  });
};
