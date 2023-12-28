"use client";
import React from "react";
import Link from "next/link";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import RegistersComponent from "@/components/registers";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";
import { AnimatePresence, motion } from "framer-motion";
import * as S from "./style";
import SkeletonRegister from "@/components/registerSkeleton";
import { Header } from "./header";
import Pagination from "@/components/pagination";

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
  const [itemDelete, setItemDelete] = useState<Register | null>(null);

  const handleItemDelete = (item: Register | null): void => setItemDelete(item);

  const getRegisters = async (): Promise<ResponseData> =>
    (await api.get(`/registers/page/${page}`)).data;

  const { data, isLoading, isError } = useQuery<ResponseData>({
    queryKey: ["registers", "registers-page"],
    queryFn: getRegisters,
  });

  const deleteRegister = async (): Promise<void> => {
    if (!itemDelete) return;
    await api.delete(`/registers/delete/${itemDelete.id}`);
    queryClient.invalidateQueries(["registers"]);
    handleItemDelete(null);
  };

  return {
    handleItemDelete,
    deleteRegister,
    itemDelete,
    isLoading,
    isError,
    data,
  };
};

const formatDataForDates = (registers: Register[]): Labels[] => {
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
};

export default function Registers() {
  //state to save URL parameter
  const [post, setPost] = useState(0);

  //Get params
  const currentPage: number = post ? Number(post) : 1;

  //Get all items of hook
  const { handleItemDelete, deleteRegister, itemDelete, isLoading, data } =
    useRegisters(currentPage);

  const router = useRouter();

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
    <div className="whitespace-nowrap w-full max-w-[55rem] flex-col m-auto flex ">
      <Header />
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
        <div className="w-full max-w-[60rem] flex flex-col gap-2">
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
