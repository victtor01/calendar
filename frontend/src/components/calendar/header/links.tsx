import { BsCalendar2Week } from "react-icons/bs";
import { IoHome, IoList } from "react-icons/io5";
import { usePathname } from "next/navigation";
import * as S from "../style";
import Link from "next/link";


const links = {
  week: {
    icon: BsCalendar2Week,
    path: "/calendar/week",
  },
  home: {
    icon: IoHome,
    path: "/calendar",
  },
  list: {
    icon: IoList,
    path: "/calendar/list",
  },
};

export const Links = () => {
  const pathName = usePathname();

  return Object.entries(links).map(([key, value]: any, index: number) => {
    const Icon = value.icon;
    const selected = pathName === value.path;
    const selectedClass = selected
    ? 'bg-indigo-500 dark:bg-indigo-700 text-white' : ''

    return (
      <Link
        style={{ opacity: selected ? 1 : 0.6 }}
        href={value.path}
        key={key}
        className={`h-12 w-12 px-4 rounded-2xl flex justify-center transition-background items-center opacity-100 relative ${selectedClass}`}
      >
        <Icon size="20" />
      </Link>
    );
  });
};
