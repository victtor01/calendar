"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clients } from "@/types/clients";
import Image from "next/image";
import Link from "next/link";
import { Server } from "@/constants/server";
import { fontOpenSans, fontValela } from "@/app/fonts";
import { FaAngleRight, FaPhoneSquareAlt } from "react-icons/fa";
import { MdAccessTime, MdEmail } from "react-icons/md";
import moment from "moment-timezone";
import * as S from './style';

const ClientComponent = ({ item, index }: { item: Clients; index: number }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = () => setShowDetails((prev) => !prev);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 9 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index / 4, type: "spring" }}
      className="flex w-[15rem] h-auto flex-col gap-2"
    >
      <Link
        href={`/clients/${item.code}`}
        className="w-full h-[10rem] border dark:border-zinc-700 bg-white dark:bg-zinc-800 relative overflow-hidden opacity-90 hover:opacity-100"
      >
        {item.photo && (
          <Image
            className="hover:scale-[1.1] transition-al"
            src={`${Server}/uploads/clients/${item?.photo}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            fill
            quality={50}
            style={{ objectFit: "cover" }}
            alt="Foto do cliente"
          />
        )}
        {!item.photo && (
          <div className="flex flex-1 w-full h-full justify-center items-center">
            <span className={`text-lg ${fontOpenSans}`}>Sem foto</span>
          </div>
        )}
      </Link>

      <div className="relative max-h-[4.4rem] min-h-[4.4rem]">
        <S.ClientContent
          initial={{ maxHeight: "4.4rem" }}
          animate={{ maxHeight: showDetails ? "8.4rem" : "4.6rem" }}
          transition={{ duration: 1, type: "spring" }}
          style={{ zIndex: showDetails ? 10 : 1 }}
          className={
            "bg-zinc-600 bg-opacity-30  relative p-3 flex flex-col gap-1 overflow-hidden transition-shadow" +
            ` ${showDetails ? "shadow-2xl" : "shadow-none"}`
          }
        >
          <h2 className={`text-lg font-semibold ${fontValela}`}>
            {item.firstName}
          </h2>
          <button
            onClick={handleShowDetails}
            className="absolute opacity-60 right-0 top-1 p-1 flex items-center gap-1"
          >
            <FaAngleRight
              size="17"
              className={`${
                showDetails ? "rotate-[90deg]" : "rotate-[0deg]"
              } transition-[transform]`}
            />
          </button>
          <motion.span className="text-md opacity-70 flex items-center gap-1">
            <MdEmail />
            {item?.email}
          </motion.span>
          <motion.span
            animate={{
              opacity: showDetails ? 0.7 : 0,
              y: showDetails ? 0 : 10,
            }}
            transition={{
              delay: showDetails ? 0 : 0.2,
            }}
            className="text-md opacity-70 flex items-center gap-1"
          >
            <FaPhoneSquareAlt />
            <span>{item.phone}</span>
          </motion.span>
          <motion.span
            animate={{
              opacity: showDetails ? 0.7 : 0,
              y: showDetails ? 0 : 10,
            }}
            transition={{
              delay: showDetails ? 0.2 : 0,
            }}
            className="text-md opacity-70 flex items-center gap-1"
          >
            <MdAccessTime />
            <span>
              {moment(item.createdAt).format("ddd,  DD [de] MMM [de] YYYY")}
            </span>
          </motion.span>
        </S.ClientContent>
      </div>
    </motion.div>
  );
};

export { ClientComponent }