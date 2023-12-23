import Link from "next/link";
import * as S from "./style";
import { IoAdd, IoHome } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import fetchs from "@/hooks/fetch";
import { QueryClient } from "@tanstack/react-query";

interface layoutProps {
  children: React.ReactNode;
}

const links = {
  registers: { path: "/finance/", icon: IoHome },
  accounts: { path: "/finance/accounts", icon: FaCreditCard },
  reminder: { path: "/finance/", icon: CiCircleList },
};

export default async function Layout({ children }: layoutProps) {

  return (
    <>
      <div className="sticky mr-3 top-0 flex items-center gap-2 h-full flex-col justify-center rounded-xl">
        <S.Bubble />
        <Link
          href={"/finance/create/"}
          className="h-14 w-14 bg-gradient-45 shadow from-purple-600 text-white hover:shadow hover:shadow-blue-700 to-blue-500 rounded-full flex justify-center items-center rounded opacity-100"
        >
          <IoAdd size="22" />
        </Link>
        {Object.entries(links).map(([name, value]: any) => {
          const { path, icon: Icon } = value;
          return (
            <Link
              href={path}
              key={name}
              className="h-14 w-14 shadow border border-white bg-white hover:shadow-inner hover:dark:shadow-zinc-700 hover:shadow-zinc-300 dark:bg-zinc-900 dark:border-zinc-900 rounded-full flex justify-center items-center rounded opacity-100"
            >
              <Icon />
            </Link>
          );
        })}
      </div>
      {children}
    </>
  );
}
