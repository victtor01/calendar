"use client";
import React from "react";
import Link from "next/link";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import RegistersComponent from "@/components/registers";
import { useState } from "react";
import moment from "moment-timezone";
import { AnimatePresence, motion } from "framer-motion";
import * as S from "./style";
import SkeletonRegister from "@/components/registerSkeleton";
import Pagination from "@/components/pagination";
import { MdFilterList } from "react-icons/md";
import { GoSearch } from "react-icons/go";

export type RegisterType = "INCOME" | "EXPENSE";

moment.tz.setDefault("America/Sao_Paulo");

interface Register {
  id: number;
  code: string;
  name: string;
  description: string;
  value: number;
  type: RegisterType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  accountId: number;
}

interface ResponseData {
  registers: Register[];
  countPage: number;
}

interface Labels {
  date: string;
  registers: Register[];
}

const useRegisters = (page: number) => {
  const api = useApiPrivate();

  const getRegisters = async (): Promise<ResponseData> =>
    (await api.get(`/registers/page/${page}`)).data;

  const { data, isLoading, isError } = useQuery<ResponseData>({
    queryKey: ["registers", "registers-page"],
    queryFn: getRegisters,
  });

  return {
    isLoading,
    isError,
    data,
  };
};

export default function Registers() {
  //state to save URL parameter
  const [post, setPost] = useState(0);

  //Get params
  const currentPage: number = post ? Number(post) : 1;

  //Get all items of hook
  const { isLoading, data } =
    useRegisters(currentPage);

  // all Registers
  const registers: Register[] = data?.registers || [];

  //const countPage: number = data?.countPage || 0;

  const labels: Labels[] = (() => {
    const data: any = [];
    registers.forEach((item: Register) => {
      const findIndex = data.findIndex((obj: any) => {
        return (
          moment(item.createdAt, "YYYY-MM-DD").format("DD/MM/YYYY") ===
          moment(obj.date, "DD/MM/YYYY").format("DD/MM/YYYY")
        );
      });

      if (findIndex !== -1) {
        data[findIndex].registers.push(item);
      } else {
        data.push({
          date: moment(item.createdAt, "YYYY-MM-DD").format("DD/MM/YYYY"),
          registers: [item],
        });
      }
    });

    return data;
  })();

  //verify if exists finance today
  const financeToDay =
    moment().diff(labels[0]?.registers[0]?.createdAt, "days") || 0;

  return (
    <div className="whitespace-nowrap w-full  flex-col m-auto flex ">
      <header className="relative flex p-2 items-center justify-between rounded">
        <S.Bubble />
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <AnimatePresence>
              <motion.button className="rounded-md items-center p-3 px-4 opacity-70 hover:opacity-100 flex gap-3 bg-cyan-500 text-white">
                <MdFilterList size="20" />
                <span>Filtrar</span>
              </motion.button>
            </AnimatePresence>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 items-center w-auto backdrop-blur-md"
        >
          <input className="focus:shadow rounded-lg w-full outline-none  transition-shadow border-none p-3 bg-zinc-400 bg-opacity-10" />
          <button className="w-[4rem] h-[3rem] rounded-md opacity-70 hover:opacity-80 bg-cyan-400 items-center justify-center flex">
            <GoSearch size="20" className="text-white" />
          </button>
        </motion.div>
      </header>
      <AnimatePresence>
        {!!financeToDay && !isLoading && (
          <motion.div
            key={"modal-attention"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-7 py-8 rounded-xl overflow-hidden relative flex gap-1 text-lg text-white shadow-lg w-auto bg-gradient-45 from-purple-600 to-emerald-400 m-2"
          >
            <S.BubbleBanner />
            <div className="flex gap-1 z-10 flex-wrap">
              Há {financeToDay} dias que não há registros,
              <S.LinkAddRegister
                href={"/finance/create/"}
                className="text-xl font-semibold text-shadow"
              >
                mantenha sua vida financeira atualizada!
              </S.LinkAddRegister>
            </div>
          </motion.div>
        )}
        {!labels?.length && !isLoading && (
          <div className="w-auto rounded-xl shadow-xl m-2 p-6 flex bg-gradient-45 from-purple-600 to-blue-600">
            <div className="text-white flex gap-1">
              <span className="text-lg font-semibold">
                Você ainda não tem nenhum registros,
              </span>
              <Link href="/finance/create/" className="text-xl font-bold">
                Crie seu primeiro registro!
              </Link>
            </div>
          </div>
        )}
      </AnimatePresence>
      <section className=" flex items-center flex-col p-1 h-auto w-full">
        <div className="w-full  flex flex-col gap-2">
          {isLoading && (
            <div className="w-auto flex flex-col gap-2">
              <SkeletonRegister />
              <SkeletonRegister />
              <SkeletonRegister />
              <SkeletonRegister />
            </div>
          )}
          {labels?.map((label: Labels, index: number) => {
            return <RegistersComponent label={label} key={index} />;
          })}
          {!registers && (
            <div className="flex flex-col gap-2 p-3">
              <p className="text-lg"> Nenhum registro </p>
              <p className="flex">
                <Link
                  href={"/finance/"}
                  className="p-3 rounded flex w-auto opacity-90 hover:opacity-100 bg-cyan-500 text-white"
                >
                  Crie um novo registro
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
