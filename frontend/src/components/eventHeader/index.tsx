"use client";

import { Event } from "@/types/events";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Modal from "../modal";
import { fontInter } from "@/app/fonts";
import { Service } from "@/types/services";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import Label from "../label";
import { Clients } from "@/types/clients";
import * as S from "./style";

interface EventHeaderProps {
  event: Event;
}

function useEventHeader() {
  const [showModalFinish, setShowModalFinish] = useState<boolean>(false);
  const handleShowModalFinish = () => setShowModalFinish((prev) => !prev);

  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const handleShowModalDelete = () => setShowModalDelete((prev) => !prev);

  return {
    finish: {
      handleShowModalFinish,
      showModalFinish,
    },
    delete: {
      showModalDelete,
      handleShowModalDelete,
    },
  };
}

export function EventHeader({ event }: EventHeaderProps) {
  const {
    finish: { handleShowModalFinish, showModalFinish },
    delete: { showModalDelete, handleShowModalDelete },
  } = useEventHeader();

  return (
    <div className="flex gap-3 items-center justify-end">
      <Button
        onClick={handleShowModalDelete}
        className="flex opacity-60 hover:bg-zinc-500  hover:bg-opacity-20 items-center justify-center rounded-full w-10 h-10"
      >
        <FiTrash size="20" />
      </Button>
      <Button className="flex opacity-60 hover:bg-zinc-500 hover:bg-opacity-20 items-center  justify-center rounded-full w-10 h-10">
        <BiArchiveIn size="20" />
      </Button>
      <motion.button
        onClick={handleShowModalFinish}
        className="opacity-90 hover:opacity-100 rounded p-3 items-center font-bold bg-gradient-45 from-purple-500 to-blue-500 text-white"
      >
        Finalizar Evento
      </motion.button>
      <AnimatePresence>
        {showModalFinish && event && (
          <Modal>
            <S.Bubble />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex p-3 rounded-md absolute z-[30] top-0 right-0 translate-x-[50%] translate-y-[-50%]"
            >
              <button
                className="bg-gradient-45 from-purple-500 opacity-90 hover:opacity-100 shadow-lg to-emerald-500 p-2 rounded-full flex w-auto"
                onClick={handleShowModalFinish}
              >
                <IoClose size="24" />
              </button>
            </motion.div>
            <div className="flex flex-col gap-7 ">
              <header className="flex items-center gap-2 bg-zinc-400 bg-opacity-10 p-4">
                <h1 className={`${fontInter} font-semibold`}>
                  Finalizar Evento
                </h1>
              </header>

              <section className="flex w-full flex-wrap gap-3">
                <Label.Root className="my-0 gap-0 w-auto flex-1 min-w-[10rem]">
                  <span className={`${fontInter} text-sm`}>Nome</span>
                  <p className="font-semibold opacity-90 text-lg">
                    {event?.name}
                  </p>
                </Label.Root>
                <Label.Root className="my-0 gap-0 w-auto min-w-[10rem]">
                  <span className={`${fontInter} text-sm`}>Descrição</span>
                  <p className="font-semibold opacity-90 text-lg">
                    {event?.description}
                  </p>
                </Label.Root>
              </section>
              <S.Separator />
              <section className="flex flex-col gap-2">
                <header className="flex justify-between gap-2 items-center">
                  <h2 className={`${fontInter}`}>Clientes do Evento</h2>
                  <div className="opacity-80 text-xs bg-gradient-45 from-purple-500 to-cyan-500 px-2 rounded p-1 text-white">
                    {event?.clients?.length || "0"} Clientes
                  </div>
                </header>
                {event?.clients?.map((item: Clients) => {
                  return (
                    <div
                      key={item.code}
                      className={`flex text-md bg-zinc-400 bg-opacity-10 p-2 justify-between opacity-90 ${fontInter}`}
                    >
                      <div>{item.firstName}</div>
                      <div>{item?.email}</div>
                    </div>
                  );
                })}
              </section>
              <S.Separator />
              <section className="flex flex-col gap-2">
                <header className="flex justify-between gap-2 items-center">
                  <h2 className={`${fontInter}`}>Serviços do Evento</h2>
                  <div className="opacity-80 text-xs bg-gradient-45 from-purple-500 to-cyan-500 px-2 rounded p-1 text-white">
                    {event?.services?.length || "0"} Serviços
                  </div>
                </header>
                {event?.services?.map((service: Service) => {
                  return (
                    <div
                      key={service.id}
                      className={`flex text-md bg-zinc-400 bg-opacity-10 p-2 justify-between opacity-90 ${fontInter}`}
                    >
                      <div>{service.name}</div>
                      <div>{convertToRealMoney.format(service?.price)}</div>
                    </div>
                  );
                })}
              </section>
              <S.Separator />
              <footer className="flex items-center gap-2">
                <input
                  className="flex-1 flex p-3 bg-zinc-400 bg-opacity-10 rounded focus:shadow-xl transition-shadow outline-none"
                  placeholder="Digite o nome do evento para confirmar"
                  required
                />
                <Button
                  onClick={() => null}
                  className="whitespace-nowrap p-3 bg-gradient-45 from-purple-500 to-cyan-500 rounded opacity-80 hover:opacity-100"
                >
                  terminar evento
                </Button>
              </footer>
            </div>
          </Modal>
        )}
        {showModalDelete && (
          <Modal className="gap-7 flex flex-col max-w-[30rem] p-5">
            <header className="w-full flex items-center  justify-between gap-3">
              <h1 className="text-lg font-semibold">
                Deletar o evento {event?.name}?
              </h1>
              <div className="flex">
                <button onClick={handleShowModalDelete}>
                  <IoClose size="24" />
                </button>
              </div>
            </header>
            <section className="flex text-justify  text-lg flex-col gap-1">
              <p>Você tem certeza que deseja excluir esse evento?</p>
              <p>Não haverá como recupera-lo depois!</p>
            </section>
            <footer className="flex justify-between">
              <motion.button className="bg-blue-500 p-2 rounded hover:opacity-100 opacity-90">
                Cancelar
              </motion.button>
              <motion.button
                onClick={() => null}
                className="bg-rose-600 p-2 rounded hover:opacity-100 opacity-90"
              >
                Tenho certeza!
              </motion.button>
            </footer>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
