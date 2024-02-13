"use client";

import { ChangeEvent, useState } from "react";
import Register from "@/components/register";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useClients as useClientsHook } from "@/hooks/useClients";
import { IoMdAdd } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import moment from "moment-timezone";
import * as S from "./style";
import { ClientComponent } from "./client-component";
import { Clients as Client } from "@/types/clients";

const useClients = () => {
  const [itemDelete, setItemDelete] = useState<Client | null>(null);
  const [nameConfirmDelete, setNameConfirmDelete] = useState<string>("");
  const onChangeNameConfirmDelete = (e: ChangeEvent<HTMLInputElement>) =>
    setNameConfirmDelete(e.target.value);
  const handleItemDelete = (newItem: Client | null) => setItemDelete(newItem);

  const api = useApiPrivate();

  const deleteItem = async (item: Client) => {
    if (nameConfirmDelete !== item.firstName) return;
    const { id } = item;
    await api.delete(`/clients/delete/${id}`);
    queryClient.invalidateQueries(["clients"]);
    handleItemDelete(null);
  };

  return {
    itemDelete,
    handleItemDelete,
    onChangeNameConfirmDelete,
    nameConfirmDelete,
    deleteItem,
  };
};

export default function Clients() {
  const {
    itemDelete,
    handleItemDelete,
    deleteItem,
    onChangeNameConfirmDelete,
    nameConfirmDelete,
  } = useClients();
  const { clients } = useClientsHook().getClients();

  return (
    <div className="flex flex-col p-4 w-full max-w-[100rem] mx-auto gap-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex p-0 items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/clients/create"
              className="bg-indigo-600 shadow flex items-center gap-3 text-gray-200 font-semibold hover:translate-y-[-0.4rem] transition-transform p-3 px-4 opacity-90 hover:opacity-100"
            >
              <IoMdAdd size="20" />
              Criar
            </Link>
          </div>
        </div>
        <div className="flex gap-3 items-center w-auto backdrop-blur-md">
          <label
            htmlFor="search"
            className="bg-white flex border dark:border-zinc-600 rounded overflow-hidden"
          >
            <input
              placeholder="Pesquise por cliente..."
              className="w-full outline-none border-none p-3 dark:bg-zinc-900"
            />
            <button className="w-[4rem] h-[3rem] opacity-90 hover:opacity-100 bg-indigo-600 items-center justify-center flex">
              <GoSearch size="20" className="text-white" />
            </button>
          </label>
        </div>
      </motion.div>

      <div className="w-full flex gap-2 flex-wrap justify-center ">
        {clients?.map((item: Client, index: number) => (
          <ClientComponent item={item} key={index} index={index} />
        ))}
        {!clients ||
          (clients?.length < 1 && (
            <div className="flex w-full flex-col text-lg bg-gradient-45 from-purple-600 to-blue-600 text-white p-5 rounded-xl shadow-xl">
              <div className="text-lg">
                Ainda não tem nenhum Cliente Cadastrado
              </div>
              <div>
                <Link
                  href="/clients/create"
                  className="text-xl font-bold opacity-80 hover:opacity-100"
                >
                  Cadastre seu primeiro cliente!
                </Link>
              </div>
            </div>
          ))}
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
            <p>
              Deseja realmente excluir o registro{" "}
              <b className="text-cyan-600">{itemDelete?.firstName}</b>? Para
              confirmar que você realmente deseja excluir o cliente, digite o
              nome abaixo
            </p>
            <div>
              <input
                className="bg-transparent border border-zinc-700 p-3 w-full rounded outline-none focus:border-cyan-500"
                onChange={onChangeNameConfirmDelete}
                value={nameConfirmDelete}
                placeholder="Exemple"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="rounded-lg opacity-80 hover:opacity-100"
              onClick={() => handleItemDelete(null)}
            >
              Fechar
            </Button>
            {itemDelete && (
              <Button
                color="danger"
                className="rounded-lg opacity-80 hover:opacity-100"
                onClick={() => deleteItem(itemDelete)}
                disabled={!nameConfirmDelete}
              >
                Tenho certeza!
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
