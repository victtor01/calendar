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
import {
  Clients as Client,
  useClients as useClientsHook,
} from "@/hooks/useClients";
import { IoMdAdd } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { FaAngleRight, FaPhoneSquareAlt } from "react-icons/fa";
import { MdAccessTime, MdEmail, MdFilterList } from "react-icons/md";
import moment from "moment-timezone";
import * as S from "./style";
import { fontValela } from "@/app/fonts";
import Image from "next/image";

moment.locale("pt-br");

const ClientComponent = ({ item, index }: { item: Client; index: number }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = () => setShowDetails((prev) => !prev);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 9 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index / 4, type: "spring" }}
      className="flex w-[15rem] h-auto flex-col gap-2"
    >
      <Link
        href={`/clients/${item.code}`}
        className="w-full h-[10rem] bg-zinc-500 relative bg-opacity-10 overflow-hidden opacity-90 hover:opacity-100"
      >
        <Image
          className="hover:scale-[1.1] transition-all"
          src="/cliente.png"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          fill
          quality={50}
          style={{ objectFit: "cover" }}
          alt="Foto do cliente"
        />
      </Link>
      <div className="relative max-h-[4.4rem] min-h-[4.4rem]">
        <S.ClientContent
          initial={{ maxHeight: "4.4rem" }}
          animate={{
            maxHeight: showDetails ? "8.4rem" : "4.6rem",
          }}
          transition={{
            duration: 1,
            type: "spring",
          }}
          style={{
            zIndex: showDetails ? 10 : 1,
          }}
          className={
            "bg-zinc-600 bg-opacity-30 absolute relative p-3 flex flex-col gap-1 overflow-hidden transition-shadow" +
            ` ${showDetails ? "shadow-2xl" : "shadow-none"}`
          }
        >
          <h2 className={`text-lg font-semibold ${fontValela}`}>
            {item.firstName}
          </h2>
          <button
            onClick={handleShowDetails}
            className="absolute opacity-60 right-0 top-1 p-1 flex items-center gap-1"
          >
            <span className="text-sm">Detalhes</span>
            <FaAngleRight
              size="17"
              className={`${
                showDetails ? "rotate-[90deg]" : "rotate-[0deg]"
              } transition-[transform]`}
            />
          </button>
          <motion.span className="text-md opacity-70 flex items-center gap-1">
            <MdEmail />
            {item?.email}
          </motion.span>
          <motion.span
            animate={{
              opacity: showDetails ? 0.7 : 0,
              y: showDetails ? 0 : 10,
            }}
            transition={{
              delay: showDetails ? 0 : 0.2,
            }}
            className="text-md opacity-70 flex items-center gap-1"
          >
            <FaPhoneSquareAlt />
            <span>{item.phone}</span>
          </motion.span>
          <motion.span
            animate={{
              opacity: showDetails ? 0.7 : 0,
              y: showDetails ? 0 : 10,
            }}
            transition={{
              delay: showDetails ? 0.2 : 0,
            }}
            className="text-md opacity-70 flex items-center gap-1"
          >
            <MdAccessTime />
            <span>
              {moment(item.createdAt).format("dddd,  DD [de] MMMM [de] YYYY")}
            </span>
          </motion.span>
        </S.ClientContent>
      </div>
    </motion.div>
  );
};

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
    <div className="flex flex-col p-4 max-w-[65rem] mx-auto gap-4">
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
              className="bg-gradient-45 from-purple-500 to-cyan-400 flex items-center gap-3 text-white p-3 px-4 opacity-70 hover:opacity-100 rounded-md"
            >
              <IoMdAdd />
              Criar
            </Link>
            <Link
              href="/clients/create"
              className="bg-gradient-45 from-cyan-500 to-blue-400 flex items-center gap-3 text-white p-3 px-4 opacity-70 hover:opacity-100 rounded-md"
            >
              <MdFilterList />
              Filtrar
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

      <div className="w-full flex gap-2 flex-wrap justify-center ">
        {clients?.map((item: Client, index: number) => (
          <ClientComponent item={item} key={index} index={index} />
        ))}
        {!clients ||
          (clients?.length < 1 && (
            <div className="flex flex-col text-lg bg-zinc-700 text-white p-3 rounded">
              <div>Ainda não tem nenhum Cliente Cadastrado</div>
              <div>
                <Link
                  href="/clients/create"
                  className="text-cyan-400 opacity-80 hover:opacity-100"
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
