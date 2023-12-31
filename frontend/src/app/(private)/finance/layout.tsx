"use client";

import * as S from "./style";
import { IoAdd, IoHome } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
        className="relative top-0 bg-blue-100 dark:bg-zinc-900 m-1 rounded-xl bg-opacity-70 dark:bg-opacity-50 flex items-center gap-2 justify-center"
      >
        <S.BubbleHeader />
        {Object.entries(links).map(([name, value]: any) => {
          const { path, icon: Icon } = value;
          const selected = pathName === path;

          return (
            <S.Linked
              $selected={selected}
              href={path}
              style={{ opacity: selected ? 1 : 0.6 }}
              key={name}
              className="h-14 w-14 px-4 flex justify-center items-center opacity-100 relative"
            >
              <Icon size="20" />
            </S.Linked>
          );
        })}
      </motion.header>
      {children}
    </>
  );
}
