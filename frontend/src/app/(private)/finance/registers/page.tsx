"use client";
import Register from "@/components/register";
import Link from "next/link";
import { fontOpenSans } from "@/app/fonts";
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
import moment from "moment";

export type RegisterType = "INCOME" | "EXPENSE";

interface Register {
  id: number;
  code: string;
  name: string;
  description: string;
  value: number;
  type: RegisterType;
  date: Date;
  createAt: Date;
  updateAt: Date;
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

export default function Registers() {
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
    <>
      <div className="whitespace-nowrap flex-col m-auto p-1 flex w-auto">
        <div
          className={`max-w-[60rem] flex p-2 rounded-lg mb-3 gap-3 ${fontOpenSans}`}
        >
          <Link
            href={"/finance"}
            className="p-3 px-5 text-lg opacity-90 hover:opacity-100 bg-cyan-600 rounded text-white flex"
          >
            Voltar
          </Link>
          <div className="flex items-center">
            <h2 className="text-2xl text-cyan-500">Todos os registros</h2>
          </div>
        </div>
        <div className=" flex items-center flex-col p-3 h-auto w-full">
          <div className="w-full max-w-[60rem] flex flex-col gap-2">
            {registers &&
              registers?.map((register: Register) => {
                const type = register.type === "INCOME" ? "Entrada" : "Saída";
                const classType =
                  register.type === "INCOME"
                    ? "text-emerald-500"
                    : "text-red-400";

                return (
                  <Register.Root key={register.id}>
                    <Register.Compartiment>
                      <Register.Title>Nome</Register.Title>
                      <Register.Content>{register.name}</Register.Content>
                    </Register.Compartiment>
                    <Register.Compartiment>
                      <Register.Title>Descrição</Register.Title>
                      <Register.Content>
                        {register?.description}
                      </Register.Content>
                    </Register.Compartiment>
                    <Register.Compartiment>
                      <Register.Title>Status</Register.Title>
                      <Register.Content className={classType}>
                        {type}
                      </Register.Content>
                    </Register.Compartiment>
                    <Register.Compartiment>
                      <Register.Title>Valor</Register.Title>
                      <Register.Content className={classType}>
                        {register.type === "INCOME" ? "+ " : "- "}
                        {convertToRealMoney.format(register.value)}
                      </Register.Content>
                    </Register.Compartiment>
                    <Register.Compartiment>
                      <Register.Title>Data</Register.Title>
                      <Register.Content>
                        {moment(register.date).format("DD / MM / YYYY")}
                      </Register.Content>
                    </Register.Compartiment>
                    <Register.Compartiment className="flex-row flex-none text-zinc-100">
                      <Register.ButtonTrash
                        onClick={() => handleItemDelete(register)}
                      />
                      <Register.ButtonEdit
                        onClick={() =>
                          router.push(
                            `/finance/registers/edit/${register.code}`
                          )
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
    </>
  );
}
