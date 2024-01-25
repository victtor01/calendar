import { BsCalendar2Week } from "react-icons/bs";
import { IoHome, IoList } from "react-icons/io5";
import { usePathname } from "next/navigation";
import * as S from "../style";
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
      ? "bg-indigo-500 dark:bg-indigo-700 text-white"
      : "  hover:bg-zinc-100 hover:dark:bg-zinc-800";

    return (
      <Link
        href={value.path}
        key={key}
        className={`h-12 w-auto px-4 gap-2 rounded-md text-md font-semibold capitalize flex justify-center transition-background items-center opacity-100 relative ${selectedClass}`}
      >
        <Icon size="20" />
        {value.name}
      </Link>
    );
  });
};
