"use client";

import { Register } from "@/types/registers";
import { AnimatePresence } from "framer-motion";
import moment from "moment";
import React, { useState } from "react";
import * as S from "./style";
import RegisterComponent from "../register";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import Modal from "../modal";
import { IoClose } from "react-icons/io5";

interface RegistersProps {
  label: {
    date: string;
    registers: Register[];
  };
}

function useRegisters() {
  const api = useApiPrivate();
  const [itemDelete, setItemDelete] = useState<Register | null>(null);

  const handleItemDelete = (item: Register | null): void => setItemDelete(item);

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
  };
}

export default function Registers({ label }: RegistersProps) {
  const { handleItemDelete, deleteRegister, itemDelete } = useRegisters();
  const router = useRouter();

  return (
    <React.Fragment key={label.date.toString()}>
      <div>
        <div className="flex py-2">
          <div className="rounded text-sm opacity-80 font-semibold">
            {moment(label.date, "DD/MM/YYYY").format("ddd, MMM DD, YYYY")}
          </div>
        </div>
        <div className="flex-1 p-1 w-full gap-2 grid grid-cols-9">
          <div className="flex-1 px-2 font-semibold opacity-50 col-span-2">Nome</div>
          <div className="flex-1 px-2 font-semibold opacity-50 col-span-2">Descrição</div>
          <div className="flex-1 px-1 font-semibold opacity-50 col-span-2">Valor</div>
          <div className="flex-1 px-2 font-semibold opacity-50 col-span-2">Hora</div>
          <div className="flex-1 px-2 font-semibold opacity-50">Ações</div>
        </div>
        <S.ContainerRegisters className="flex flex-col">
          {label.registers &&
            label.registers?.map((register: Register, index: number) => {
              const classType =
                register.type === "INCOME"
                  ? "bg-emerald-500 text-emerald-500 bg-opacity-20"
                  : "bg-rose-500 text-rose-500 bg-opacity-20";

              return (
                <div
                  className="grid p-2 gap-4 text-justify w-full grid-cols-9 shadow bg-white items-center dark:bg-zinc-800 "
                  key={index}
                >
                  <div className="col-span-2">{register.name}</div>
                  <div className="whitespace-normal col-span-2">
                    {register.description}
                  </div>
                  <div className="flex col-span-2">
                    <div className={`${classType} px-4 p-1 rounded`}>
                      {convertToRealMoney.format(register.value)}
                    </div>
                  </div>
                  <div className="col-span-2">teste</div>
                  <div className="">
                    
                  </div>
                </div>
              );
            })}
        </S.ContainerRegisters>
      </div>
      <AnimatePresence>
        {itemDelete && (
          <Modal className="flex flex-col gap-3 max-w-[26rem]">
            <header className="flex items-center justify-between">
              <h2 className="text-xl font-semibold opacity-80 capitalize">
                deletar o registro {itemDelete.name}?
              </h2>
              <button onClick={() => handleItemDelete(null)}>
                <IoClose size="20" />
              </button>
            </header>
            <section className="text-lg whitespace-normal">
              <p className="">
                Quando você excluir, não haverá como recuperá-lo.{" "}
              </p>
            </section>
            <footer className="flex items-center justify-between">
              <button
                onClick={() => handleItemDelete(null)}
                className="p-3 bg-gradient-45 from-blue-600 to-blue-500 opacity-70 hover:opacity-100 text-white font-semibold rounded"
              >
                Cancelar
              </button>
              <button
                onClick={deleteRegister}
                className="p-3 bg-gradient-45 from-rose-700 to-red-500 opacity-70 hover:opacity-100 text-white font-semibold rounded"
              >
                Tenho certeza!
              </button>
            </footer>
          </Modal>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
