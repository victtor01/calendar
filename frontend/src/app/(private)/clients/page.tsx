"use client";
import Register from "@/components/register";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { Clients, useClients as useClientsHook } from "@/hooks/useClients";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";

const useClients = () => {
  const [itemDelete, setItemDelete] = useState<Clients | null>(null);
  const handleItemDelete = (newItem: Clients | null) => setItemDelete(newItem);
  const api = useApiPrivate();

  const deleteItem = async (id: number) => {
    await api.delete(`/clients/delete/${id}`);
    queryClient.invalidateQueries(["clients"]);
    handleItemDelete(null);
  };

  return {
    itemDelete,
    handleItemDelete,
    deleteItem,
  };
};

export default function Clients() {
  const { itemDelete, handleItemDelete, deleteItem } = useClients();
  const { clients }: { clients: Clients[] | undefined } =
    useClientsHook().getClients();

  return (
    <>
      <div className="w-auto flex min-w-[40rem] flex-col gap-2">
        <div className="text-xl text-cyan-600 mt-5">Todos os meus clientes</div>
        {clients?.map((item: Clients) => (
          <Register.Root>
            <Register.Compartiment>
              <Register.Title>Primeiro nome</Register.Title>
              <Register.Content>{item.firstName}</Register.Content>
            </Register.Compartiment>
            <Register.Compartiment>
              <Register.Title>Email</Register.Title>
              <Register.Content>{item?.email || "-"}</Register.Content>
            </Register.Compartiment>
            <Register.Compartiment className="flex-none flex-row">
              <Register.ButtonTrash onClick={() => handleItemDelete(item)} />
              <Register.ButtonEdit />
            </Register.Compartiment>
          </Register.Root>
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
            <p>Deseja realmente excluir o registro {itemDelete?.firstName}?</p>
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
            {itemDelete && (
              <Button
                color="danger"
                className="rounded-lg opacity-80 hover:opacity-100"
                onClick={() => deleteItem(itemDelete.id)}
              >
                Tenho certeza!
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
