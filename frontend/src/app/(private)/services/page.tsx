"use client";

import Register from "@/components/register";
import moment from "moment";
import { GoSearch } from "react-icons/go";
import { Service } from "../../../types/services";
import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "@/hooks/apiPrivate";
import Loading from "@/components/loading";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { queryClient } from "@/hooks/queryClient";
import * as S from "./styles";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import { useRouter } from "next/navigation";

interface ItemDeleteProps {
  id: number;
  name: string;
}

function useServices() {
  const api = useApiPrivate();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return (await api.get("/services")).data;
    },
  });

  const {} = useQuery({
    queryKey: ["services", "services-last-month"],
  });

  const [itemDelete, setItemDelete] = useState<ItemDeleteProps | null>(null);

  const handleItemDelete = (value: ItemDeleteProps | null) =>
    setItemDelete(value);

  async function deleteItem() {
    if (itemDelete && itemDelete.id) {
      await api.delete(`/services/${itemDelete.id}`);
      queryClient.setQueryData(["services"], (data: any) => {
        if (data) {
          const updatedData = data.filter(
            (item: any) => item.id !== itemDelete.id
          );
          return updatedData;
        }
        return data;
      });
      handleItemDelete(null);
    }
  }

  return {
    query: {
      services,
      isLoading,
    },
    delete: {
      itemDelete,
      deleteItem,
      handleItemDelete,
    },
  };
}

export default function Services() {
  const {
    query: { services, isLoading },
    delete: { itemDelete, deleteItem, handleItemDelete },
  } = useServices();

  const { push } = useRouter();

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-col m-auto max-w-[50rem] w-full p-2 gap-3 relative overflow-visible">
        <S.Bubble />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex p-0 items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/services/create"
                className="bg-gradient-45 from-purple-500 to-cyan-500 flex items-center gap-3 text-white p-3 px-4 opacity-70 hover:opacity-100 rounded-md"
              >
                <IoMdAdd />
                Criar
              </Link>
            </div>
          </div>
          <div className="flex gap-3 items-center w-auto backdrop-blur-md">
            <input className="focus:shadow rounded-lg w-full outline-none p-1 transition-shadow border-none p-3 bg-zinc-400 bg-opacity-10" />
            <button className="w-[4rem] h-[3rem] rounded-md opacity-70 hover:opacity-80 bg-cyan-400 items-center justify-center flex">
              <GoSearch size="20" className="text-white" />
            </button>
          </div>
        </motion.div>
        <AnimatePresence mode="sync">
          {services?.map((item: Service, index: number) => {
            return (
              <Register.Root
                layout
                key={index}
                transition={{ delay: index / 10, type: "spring" }}
              >
                <Register.Compartiment>
                  <Register.Title>Nome</Register.Title>
                  <Register.Content>{item.name}</Register.Content>
                </Register.Compartiment>
                <Register.Compartiment>
                  <Register.Title>Descrição</Register.Title>
                  <Register.Content>
                    {item?.description || "-"}
                  </Register.Content>
                </Register.Compartiment>
                <Register.Compartiment>
                  <Register.Title>preço</Register.Title>
                  <Register.Content>
                    <div className="p-2 w-auto min-w-[5rem] flex justify-center bg-opacity-20 text-xs rounded font-semibold bg-emerald-500 text-emerald-500">
                      {convertToRealMoney.format(item?.price)}
                    </div>
                  </Register.Content>
                </Register.Compartiment>
                <Register.Compartiment>
                  <Register.Title>Criado em</Register.Title>
                  <Register.Content>
                    {moment(item.createdAt).format("ddd, DD MMM YYYY")}{" "}
                  </Register.Content>
                </Register.Compartiment>
                <Register.ButtonTrash
                  onClick={() =>
                    handleItemDelete({
                      name: item.name,
                      id: item.id,
                    })
                  }
                />
                <Register.ButtonEdit
                  onClick={() => push(`/services/edit/${item.code}`)}
                />
              </Register.Root>
            );
          })}
        </AnimatePresence>
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
          {itemDelete && (
            <ModalBody>
              <p>Deseja realmente excluir o registro {itemDelete?.name}?</p>
              <p>Depois de excluir, não haverá como recupera-lo!</p>
            </ModalBody>
          )}
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
              onClick={deleteItem}
            >
              Tenho certeza!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
