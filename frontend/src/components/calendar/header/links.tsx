import { BsCalendar2Week } from "react-icons/bs";
import { IoHome, IoList } from "react-icons/io5";
import { usePathname } from "next/navigation";
import * as S from "../style";


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

    return (
      <S.Linked
        style={{ opacity: selected ? 1 : 0.6 }}
        $selected={selected}
        href={value.path}
        key={key}
        className="h-14 w-14 px-4 flex justify-center items-center opacity-100 relative"
      >
        <Icon size="20" />
      </S.Linked>
    );
  });
};
