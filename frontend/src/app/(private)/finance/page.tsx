"use client";

import Register from "@/components/register";
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
} from "@nextui-org/react";
import { useState } from "react";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import moment from "moment-timezone";
import { IoMdAdd } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

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

const useRegisters = () => {
  const api = useApiPrivate();
  const getRegisters = async () => (await api.get("/registers")).data;
  const [itemDelete, setItemDelete] = useState<Register | null>(null);
  const handleItemDelete = (item: Register | null) => setItemDelete(item);

  const {
    data: registers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["registers"],
    queryFn: getRegisters,
  });

  const deleteRegister = async (): Promise<void> => {
    if (!itemDelete) {
      return;
    }
    await api.delete(`/registers/delete/${itemDelete.id}`);
    handleItemDelete(null);
    queryClient.invalidateQueries(["registers"]);
  };

  return {
    handleItemDelete,
    deleteRegister,
    itemDelete,
    registers,
    isLoading,
    isError,
  };
};

export default function Registers({
  params: { post },
}: {
  params: {
    post: string;
  };
}) {
  const router = useRouter();
  const {
    handleItemDelete,
    deleteRegister,
    itemDelete,
    registers,
    isLoading,
    isError,
  } = useRegisters();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loading className="bg-cyan-200" />
      </div>
    );
  }

  if (isError) {
    return null;
  }
  

  return (
    <div className="whitespace-nowrap w-full max-w-[50rem] flex-col m-auto flex w-auto">
      <div className="flex p-1 items-center justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            teste
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
        <div className="flex gap-2">
          <Link href={"?page=1"}>Voltar</Link>
          <Link href={"?page=2"}>Ir</Link>
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
      </div>
      <div className=" flex items-center flex-col p-1 h-auto w-full">
        <div className="w-full max-w-[60rem] flex flex-col gap-2">
          {registers &&
            registers?.map((register: Register, index: number) => {
              const classType =
                register.type === "INCOME"
                  ? "bg-emerald-500 text-emerald-500"
                  : "bg-rose-500 text-rose-700";
              return (
                <Register.Root
                  className="grid grid-cols-1 gap-4"
                  key={register.id}
                  transition={{ delay: index / 10 }}
                >
                  <Register.Compartiment className="max-w-xs">
                    <Register.Title>Nome</Register.Title>
                    <Register.Content>{register.name}</Register.Content>
                  </Register.Compartiment>
                  <Register.Compartiment className="">
                    <Register.Title>Descrição</Register.Title>
                    <Register.Content className="flex-1 overflow-hidde w-[6rem] line-clamp-1">
                      {register?.description}
                    </Register.Content>
                  </Register.Compartiment>
                  <Register.Compartiment>
                    <Register.Title>Valor</Register.Title>
                    <Register.Content>
                      <div
                        className={` p-2 w-auto min-w-[5rem] flex justify-center bg-opacity-20 text-xs rounded font-semibold ${classType}`}
                      >
                        {register.type === "INCOME" ? "+ " : "- "}
                        {convertToRealMoney.format(register.value)}
                      </div>
                    </Register.Content>
                  </Register.Compartiment>
                  <Register.Compartiment>
                    <Register.Title>Data</Register.Title>
                    <Register.Content>
                      {moment(register.createdAt)
                        .tz("America/Sao_Paulo")
                        .fromNow()}
                    </Register.Content>
                  </Register.Compartiment>
                  <Register.Compartiment className="flex-row flex-none">
                    <Register.ButtonTrash
                      onClick={() => handleItemDelete(register)}
                    />
                    <Register.ButtonEdit
                      onClick={() =>
                        router.push(`/finance/edit/${register.code}`)
                      }
                    />
                  </Register.Compartiment>
                </Register.Root>
              );
            })}
          {!registers && (
            <div className="flex flex-col gap-2 p-3">
              <p className="text-lg"> Nenhum registro </p>
              <p className="flex">
                <Link
                  href={"/finance"}
                  className="p-3 rounded flex w-auto opacity-90 hover:opacity-100 bg-cyan-500 text-white"
                >
                  Crie um novo registro
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
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
    </div>
  );
}
