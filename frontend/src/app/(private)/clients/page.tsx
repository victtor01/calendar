"use client";
import Input from "@/components/input/input";
import Register from "@/components/register";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import {
  Clients as Client,
  useClients as useClientsHook,
} from "@/hooks/useClients";
import { ChangeEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

const useClients = () => {
  const [itemDelete, setItemDelete] = useState<Client | null>(null);
  const [nameConfirmDelete, setNameConfirmDelete] = useState<string>("");
  const onChangeNameConfirmDelete = (e: ChangeEvent<HTMLInputElement>) =>
    setNameConfirmDelete(e.target.value);
  const handleItemDelete = (newItem: Client | null) => setItemDelete(newItem);

  const api = useApiPrivate();

  const deleteItem = async (item: Client) => {
    if (nameConfirmDelete !== item.firstName) {
      return;
    }
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
    <div className="flex flex-col m-auto">
      <div className="w-full flex max-w-[70rem] flex-col gap-2">
        <div className="text-xl text-cyan-600 mt-5">Todos os meus clientes</div>
        {clients?.map((item: Client) => (
          <Register.Root key={item.id}>
            <Register.Compartiment>
              <Register.Title>Primeiro nome</Register.Title>
              <Register.Content>{item.firstName}</Register.Content>
            </Register.Compartiment>
            <Register.Compartiment>
              <Register.Title>Email</Register.Title>
              <Register.Content>{item?.email || "-"}</Register.Content>
            </Register.Compartiment>
            <Register.Compartiment>
              <Register.Title>Telefone</Register.Title>
              <Register.Content>{item.phone || '-'}</Register.Content>
            </Register.Compartiment>
            <Register.Compartiment className="flex-none flex-row">
              <Register.ButtonTrash onClick={() => handleItemDelete(item)} />
              <Register.ButtonEdit />
            </Register.Compartiment>
          </Register.Root>
        ))}
        {!clients ||
          (clients?.length < 1 && (
            <div className="flex flex-col text-lg opacity-70">
              <div>Ainda não tem nenhum Cliente Cadastrado</div>
              <div>
                <Link
                  href={"clients/create"}
                  className="text-cyan-500 opacity-80 hover:opacity-100"
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
