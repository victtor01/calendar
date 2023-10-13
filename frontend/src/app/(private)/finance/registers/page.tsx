"use client";
import Register from "@/components/register";
import Link from "next/link";
import { fontOpenSans } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";

export type RegisterType = "INCOME" | "EXPENSE";

interface Register {
  id: number;
  code: string;
  name: string;
  description: string;
  value: number;
  type: RegisterType;
  createAt: Date;
  updateAt: Date;
  accountId: number;
}

const useRegisters = () => {
  const api = useApiPrivate();
  const getRegisters = async () => (await api.get("/registers")).data;

  const { data: registers, isLoading } = useQuery({
    queryKey: ["registers"],
    queryFn: getRegisters,
  });

  return {
    registers,
    isLoading,
  };
};

export default function Registers() {
  const { registers, isLoading } = useRegisters();

  if (isLoading) {
    return "loading...";
  }

  return (
    <div className="flex-col mx-auto mt-10 p-3 flex w-full items-center h-[100%]">
      <div
        className={`max-w-[60rem] p-2 rounded-lg w-[98%] flex mb-3 item-center gap-3 ${fontOpenSans}`}
      >
        <Link
          href={"/finance"}
          className="p-2 px-4 opacity-70 hover:opacity-100 bg-cyan-600 rounded text-white flex"
        >
          Voltar
        </Link>
        <div className="flex items-center">
          <h2 className="text-2xl text-cyan-500">Todos os registros</h2>
        </div>
      </div>
      <div className=" flex w-full items-center flex-col p-3 flex-1 h-auto rounded-t-3xl">
        <div className="w-full max-w-[60rem] flex flex-col gap-2">
          {registers?.map((register: Register) => {
            const type = register.type === "INCOME" ? "Entrada" : "Saída";
            const classType =
              register.type === "INCOME" ? "text-emerald-500" : "text-red-400";

            return (
              <Register.Root>
                <Register.Compartiment>
                  <Register.Title>Nome</Register.Title>
                  <Register.Content>{register.name}</Register.Content>
                </Register.Compartiment>
                <Register.Compartiment>
                  <Register.Title>Descrição</Register.Title>
                  <Register.Content>{register?.description}</Register.Content>
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
                    {convertToRealMoney.format(register.value)}
                  </Register.Content>
                </Register.Compartiment>
                <Register.Compartiment className="flex-row flex-none text-zinc-100">
                  <Register.ButtonTrash />
                  <Register.ButtonEdit />
                </Register.Compartiment>
              </Register.Root>
            );
          })}
        </div>
      </div>
    </div>
  );
}
