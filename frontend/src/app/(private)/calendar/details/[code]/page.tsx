"use client";

import Button from "@/components/button";
import { BiArchiveIn } from "react-icons/bi";
import * as S from "./style";
import { FiTrash } from "react-icons/fi";
import useDetails from "./useDatails";
import { BsArrowLeft } from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as ButtonModal,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import Edit from "./edit";
import Comments from "./comments";
import Clients from "./clients";
import Services from "./services";
import { fontInter, fontValela } from "@/app/fonts";
import Label from "@/components/label";

const variants = {
  pageInitial: { opacity: 0, x: 40, y: 0 },
  pageAnimate: { opacity: 1, x: 0, y: 0 },
};

interface ModalProps {
  handleShowModal: () => void;
  eventDelete: () => void;
  show: boolean;
}

const ModalDelete = ({ handleShowModal, eventDelete, show }: ModalProps) => {
  return (
    <Modal
      onOpenChange={handleShowModal}
      isDismissable={false}
      isOpen={show}
      className="bg-zinc-900"
    >
      <ModalContent className="flex">
        <ModalHeader className="flex flex-col gap-1">Deletar</ModalHeader>
        <ModalBody>
          <p>Deseja realmente excluir esse evento?</p>
        </ModalBody>
        <ModalFooter>
          <ButtonModal
            color="primary"
            className="rounded-lg opacity-80 hover:opacity-100"
            onClick={handleShowModal}
          >
            Fechar
          </ButtonModal>
          <ButtonModal
            color="danger"
            onClick={eventDelete}
            className="rounded-lg bg-rose-600 opacity-80 hover:opacity-100"
          >
            Excluir!
          </ButtonModal>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default function Details({
  params: { code },
}: {
  params: {
    code: string;
  };
}) {
  const {
    query: { event, isLoading },
    modalDelete: { handleShowModalDelete, showModalDelete },
    modalFinish: { showModalFinish, handleShowModalFinish, setShowModalFinish },
    events: { deleteEvent },
  } = useDetails(code);

  if (isLoading) {
    return;
  }

  if (!event) {
    window.location.href = "/calendar";
  }

  return (
    <motion.main
      variants={variants}
      initial="pageInitial"
      animate="pageAnimate"
      className="p-2 m-auto flex w-full"
      transition={{ type: "linear" }}
    >
      <S.Container className="flex max-w-[120rem] m-10 bg-white w-full m-auto flex-col pb-5 gap-2 shadow-md rounded-md">
        <div className="flex justify-between gap-3 p-2 bg-gray-400 bg-opacity-10 rounded-t-lg">
          <div className="flex">
            <Link
              href="/calendar"
              className="flex gap-3 px-3 items-center opacity-60"
            >
              <BsArrowLeft />
              Voltar
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <Button
              onClick={handleShowModalDelete}
              className="flex opacity-60 hover:bg-zinc-500 rounded hover:bg-opacity-20 items-center justify-center rounded-full w-10 h-10"
            >
              <FiTrash size="20" />
            </Button>
            <Button className="flex opacity-60 hover:bg-zinc-500 rounded hover:bg-opacity-20 items-center  justify-center rounded-full w-10 h-10">
              <BiArchiveIn size="20" />
            </Button>
            <AnimatePresence>
              <motion.button
                onClick={handleShowModalFinish}
                className="rounded p-3 items-center font-bold bg-gradient-45 from-purple-500 to-blue-500 text-white"
              >
                Finalizar Evento
              </motion.button>
              {showModalFinish && event && (
                <motion.div
                  key={`modal-finish`}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-0 left-0 w-full h-screen bg-zinc-900 bg-opacity-10 z-[15] backdrop-blur-lg flex justify-center items-center"
                >
                  <S.Modal
                    className="bg-zinc-800 flex flex-col rounded-md w-[30rem] p-3 h-auto relative z-[10]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ type: "spring" }}
                  >
                    <S.Bubble />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex p-3 rounded-md absolute z-[30] top-0 right-0 absolute translate-x-[50%] translate-y-[-50%]"
                    >
                      <button
                        className="bg-gradient-45 from-purple-500 opacity-90 hover:opacity-100 shadow-lg to-emerald-500 p-2 rounded-full flex w-auto"
                        onClick={handleShowModalFinish}
                      >
                        <IoClose size="24" />
                      </button>
                    </motion.div>
                    <div className="flex flex-col gap-5">
                      <header>
                        <h1 className={`${fontInter} font-semibold`}>
                          Finalizar tarefa
                        </h1>
                      </header>
                      <section className="flex w-full flex-wrap gap-3">
                        <Label.Root className="my-0 gap-0 w-auto flex-1">
                          <span className={`${fontInter} text-sm`}>Nome</span>
                          <p className="font-semibold text-purple-600 text-lg">
                            {event?.name}
                          </p>
                        </Label.Root>
                        <Label.Root className="my-0 gap-0 w-auto flex-1">
                          <span className={`${fontInter} text-sm`}>
                            Descrição
                          </span>
                          <p className="font-semibold text-purple-600 text-lg">
                            {event?.description}
                          </p>
                        </Label.Root>
                      </section>
                    </div>
                  </S.Modal>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full h-full pt-4 flex relative justify-between rounded-xl">
          <div className="flex flex-row flex-wrap gap-2 w-full">
            {event && (
              <>
                <Edit event={event} />
                <Comments event={event} />
                <Clients event={event} />
                <Services event={event} />
              </>
            )}
          </div>
        </div>
        <ModalDelete
          show={showModalDelete}
          handleShowModal={handleShowModalDelete}
          eventDelete={deleteEvent}
        />
      </S.Container>
    </motion.main>
  );
}
