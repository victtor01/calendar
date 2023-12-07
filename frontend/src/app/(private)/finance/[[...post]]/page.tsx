"use client";
import React from "react";
import RegisterComponent from "@/components/register";
import Link from "next/link";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { useState } from "react";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import moment from "moment-timezone";
import { IoMdAdd } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaCreditCard } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import * as S from "../style";
import SkeletonRegister from "@/components/registerSkeleton";

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

export default function Registers({
  params: { post },
}: {
  params: {
    post: string;
  };
}) {
  const router = useRouter();
  const currentPage: number = post ? Number(post[0]) : 1;

  const {
    handleItemDelete,
    deleteRegister,
    itemDelete,
    isLoading,
    isError,
    data,
  } = useRegisters(currentPage);

  /* Desistrturar o data */
  const registers: Register[] = data?.registers || [];
  const countPage: number = data?.countPage || 0;

  if (currentPage > countPage && currentPage && countPage)
    router.push(`/finance/${countPage}`);

  const labels: Labels[] = formatDataForDates(registers);

  const financeToDay =
    moment().diff(labels[0]?.registers[0]?.createdAt, "days") || 0;

  const paginationLinks = [];
  for (
    let page = currentPage - 1;
    page <= currentPage + 1 && page <= countPage;
    page++
  ) {
    if (page > 0) {
      paginationLinks.push(
        <Link
          className={`p-2 w-10 flex justify-center rounded items-center font-semibold transition-background opacity-100 ${
            currentPage === page
              ? "bg-cyan-500 bg-opacity-90 text-white"
              : "bg-zinc-400 bg-opacity-20"
          }`}
          key={page}
          href={`/finance/${page}`}
        >
          {page}
        </Link>
      );
    }
  }

  return (
    <div className="whitespace-nowrap w-full max-w-[55rem] flex-col m-auto flex w-auto">
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
              <motion.button className="p-0 rounded-md items-center p-3 px-4 opacity-70 hover:opacity-100 flex gap-3 bg-cyan-500 text-white">
                <MdFilterList size="20" />
                <span>Filtrar</span>
              </motion.button>
            </AnimatePresence>
            <Link
              href="/finance/accounts"
              className="bg-cyan-500 flex items-center gap-3 text-white p-3 px-4 opacity-70 hover:opacity-100 rounded-md"
            >
              <FaCreditCard />
              Contas
            </Link>
            <Link
              href="/finance/create"
              className="bg-gradient-45 from-purple-500 to-blue-500 flex items-center gap-3 text-white p-3 px-4 opacity-70 hover:opacity-100 rounded-md"
            >
              <IoMdAdd />
              Criar
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 items-center w-auto backdrop-blur-md"
        >
          <input className="focus:shadow rounded-lg w-full outline-none p-1 transition-shadow border-none p-3 bg-zinc-400 bg-opacity-10" />
          <button className="w-[4rem] h-[3rem] rounded-md opacity-70 hover:opacity-80 bg-cyan-400 items-center justify-center flex">
            <GoSearch size="20" className="text-white" />
          </button>
        </motion.div>
      </header>
      <AnimatePresence>
        {financeToDay && (
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
        {!labels?.length && (
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
            </div>
          )}
          {labels?.map((label: Labels) => {
            return (
              <React.Fragment key={label.date}>
                <div className="flex mt-2 px-2">
                  <div className="rounded text-sm opacity-80 font-semibold">
                    {moment(label.date, "DD/MM/YYYY").format(
                      "ddd, MMM DD, YYYY"
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {label.registers &&
                    label.registers?.map(
                      (register: Register, index: number) => {
                        const classType =
                          register.type === "INCOME"
                            ? "bg-emerald-500 text-emerald-500"
                            : "bg-rose-500 text-rose-700";
                        return (
                          <RegisterComponent.Root
                            layout
                            className="grid grid-cols-1 gap-4"
                            key={register.id.toString()}
                            transition={{ delay: index / 10 }}
                          >
                            <RegisterComponent.Compartiment className="max-w-xs">
                              <RegisterComponent.Title>
                                Nome
                              </RegisterComponent.Title>
                              <RegisterComponent.Content>
                                {register.name}
                              </RegisterComponent.Content>
                            </RegisterComponent.Compartiment>
                            <RegisterComponent.Compartiment className="">
                              <RegisterComponent.Title>
                                Descrição
                              </RegisterComponent.Title>
                              <RegisterComponent.Content className="flex-1 overflow-hidde w-[6rem] line-clamp-1">
                                {register?.description}
                              </RegisterComponent.Content>
                            </RegisterComponent.Compartiment>
                            <RegisterComponent.Compartiment>
                              <RegisterComponent.Title>
                                Valor
                              </RegisterComponent.Title>
                              <RegisterComponent.Content>
                                <div
                                  className={` p-2 w-auto min-w-[5rem] flex justify-center bg-opacity-20 text-xs rounded font-semibold ${classType}`}
                                >
                                  {register.type === "INCOME" ? "+ " : "- "}
                                  {convertToRealMoney.format(register.value)}
                                </div>
                              </RegisterComponent.Content>
                            </RegisterComponent.Compartiment>
                            <RegisterComponent.Compartiment>
                              <RegisterComponent.Title>
                                Data
                              </RegisterComponent.Title>
                              <RegisterComponent.Content>
                                {moment(register.createdAt).format("HH[h]mm")}
                              </RegisterComponent.Content>
                            </RegisterComponent.Compartiment>
                            <RegisterComponent.Compartiment className="flex-row flex-none">
                              <RegisterComponent.ButtonTrash
                                onClick={() => handleItemDelete(register)}
                              />
                              <RegisterComponent.ButtonEdit
                                onClick={() =>
                                  router.push(`/finance/edit/${register.code}`)
                                }
                              />
                            </RegisterComponent.Compartiment>
                          </RegisterComponent.Root>
                        );
                      }
                    )}
                </AnimatePresence>
              </React.Fragment>
            );
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
      <Modal
        onOpenChange={() => handleItemDelete(null)}
        isOpen={itemDelete !== null}
        isDismissable={false}
        className="bg-zinc-900"
      >
        <ModalContent className="flex">
          <ModalHeader className="flex flex-col gap-1">
            Excluir registro
          </ModalHeader>
          <ModalBody>
            <p>Deseja realmente excluir o registro {itemDelete?.name}?</p>
            <p>Depois de excluir, não haverá como recupera-lo!</p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="rounded-lg opacity-80 hover:opacity-100"
              onClick={() => handleItemDelete(null)}
            >
              Fechar
            </Button>
            <Button
              color="danger"
              className="rounded-lg opacity-80 hover:opacity-100"
              onClick={deleteRegister}
            >
              Tenho certeza!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="flex gap-2 p-3 justify-end">
        <Link
          className="flex items-center opacity-40 hover:opacity-70"
          href={`/finance/${currentPage > 1 ? currentPage - 1 : currentPage}`}
        >
          <FaChevronLeft />
        </Link>
        {paginationLinks}
        <Link
          className="flex items-center opacity-40 hover:opacity-70"
          href={`/finance/${currentPage + 1}`}
        >
          <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}
