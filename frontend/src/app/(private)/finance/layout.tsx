"use client";

import * as S from "./style";
import { IoAdd, IoHome } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

interface layoutProps {
  children: React.ReactNode;
}

const links = {
  add: { path: "/finance/create", icon: IoAdd },
  registers: { path: "/finance", icon: IoHome },
  accounts: { path: "/finance/accounts", icon: FaCreditCard },
  reminder: { path: "/finance/list", icon: CiCircleList },
};

export default function Layout({ children }: layoutProps) {
  const pathName = usePathname();

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "linear", duration: 0.3 }}
        className="relative top-0 bg-white dark:bg-zinc-900 mx-auto p-2 rounded-xl dark:bg-opacity-50 flex items-center gap-2 justify-center"
      >
        <S.BubbleHeader />
        {Object.entries(links).map(([name, value]: any) => {
          const { path, icon: Icon } = value;
          const selected = pathName === path;
          const selectedClass = selected
            ? "bg-indigo-500 dark:bg-indigo-700 text-white"
            : "";

          return (
            <Link
              href={path}
              style={{ opacity: selected ? 1 : 0.6 }}
              key={name}
              className={`h-12 w-12 px-4 rounded-2xl flex justify-center transition-background items-center opacity-100 relative ${selectedClass}`}
            >
              <Icon size="20" />
            </Link>
          );
        })}
      </motion.header>
      {children}
    </>
  );
}
