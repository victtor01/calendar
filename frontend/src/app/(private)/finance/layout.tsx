"use client";

import * as S from "./style";
import { IoAdd, IoHome } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Loading from "./loading";

interface layoutProps {
  children: React.ReactNode;
}

const links = {
  add: { path: "/finance/create", icon: IoAdd, name: "Adicionar" },
  registers: { path: "/finance", icon: IoHome, name: "Home" },
  accounts: { path: "/finance/accounts", icon: FaCreditCard, name: "Contas" },
/*   reminder: { path: "/finance/list", icon: CiCircleList, name: "Lembrar" }, */
};

export default function Layout({ children }: layoutProps) {
  const pathName = usePathname();

  return (
    <>
      <header className="relative top-0 bg-zinc-900 z-20 mx-auto p-2 border border-b-transparent text-white flex w-full transition-shadow items-center gap-2 justify-center dark:border-zinc-800">
        {Object.entries(links).map(([name, value]: any) => {
          const { path, icon: Icon } = value;
          const selected = pathName === path;
          const selectedClass = selected
            ? "bg-zinc-700 dark:bg-indigo-700 text-white"
            : "";

          return (
            <Link
              href={path}
              style={{ opacity: selected ? 1 : 0.6 }}
              key={name}
              className={`h-12 w-auto px-4 gap-2 rounded-md text-md font-semibold capitalize flex justify-center transition-background items-center opacity-100 relative ${selectedClass}`}
            >
              <Icon size="20" />
              {value.name}
            </Link>
          );
        })}
      </header>
      {children}
    </>
  );
}
