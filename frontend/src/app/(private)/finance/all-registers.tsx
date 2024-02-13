"use client";

import { Register } from "@/types/registers";
import { AnimatePresence } from "framer-motion";
import moment from "moment";
import React, { useState } from "react";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Modal from "@/components/modal";
import styles from "./finance.module.css";
import Link from "next/link";

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

  return (
    <div key={label.date.toString()} className="p-1 border dark:border-zinc-800">
      <div className={`mt-3`}>
        <div className="flex">
          <div className="rounded opacity-80 font-semibold text-md text-gray-500 px-2">
            {moment(label.date, "DD/MM/YYYY").format("ddd, MMM DD, YYYY")}
          </div>
        </div>
        <div className="flex-1 p-2 w-full gap-2 grid grid-cols-9">
          <div className="flex-1 font-semibold opacity-50 col-span-2">
            Nome
          </div>
          <div className="flex-1 font-semibold opacity-50 col-span-2">
            Descrição
          </div>
          <div className="flex-1 font-semibold opacity-50 col-span-2">
            Valor
          </div>
          <div className="flex-1 font-semibold opacity-50 col-span-2">
            Hora
          </div>
          <div className="flex-1 font-semibold opacity-50">Ações</div>
        </div>
        <div className={`flex flex-col`}>
          {label.registers &&
            label.registers?.map((register: Register, index: number) => {
              const classType =
                register.type === "INCOME"
                  ? "bg-emerald-500 text-emerald-500 bg-opacity-20"
                  : "bg-rose-500 text-rose-500 bg-opacity-20";

              return (
                <div
                  className="grid p-2 gap-4 text-justify hover:z-30 w-full grid-cols-9 bg-white items-center dark:bg-zinc-900 hover:bg-gray-100 hover:dark:bg-zinc-800 "
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
                  <div className="flex gap-3">
                    <Link
                      href={`/finance/edit/${register.code}`}
                      className="underline text-gray-600 dark:text-white hover:text-indigo-500 font-semibold opacity-90 hover:opacity-100"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleItemDelete(register)}
                      className="underline text-gray-600 dark:text-white hover:text-indigo-500 font-semibold opacity-90 hover:opacity-100"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <AnimatePresence>
        {itemDelete && (
          <Modal
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="flex flex-col gap-3 max-w-[40rem]"
          >
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
      <span className="w-full h-[1px] bg-gray-300 dark:bg-zinc-700 mt-3" />
    </div>
  );
}
