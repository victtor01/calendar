"use client";

import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { MdBackupTable } from "react-icons/md";
import { BsCalendar2Week } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaCalendar } from "react-icons/fa";
import { InputColors } from "@/components/inputColors";
import { toast } from "react-toastify";
import { colorsEvents as colors } from "@/constants/colorsEvents";
import * as S from "./style";

type CreateModelEventFormData = z.infer<typeof createModelEventFormSchema>;

const createModelEventFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const useHeader = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateModelEventFormData>({
    resolver: zodResolver(createModelEventFormSchema),
  });

  const api = useApiPrivate();

  const [showModalAddEvent, setShowModalAddEvent] = useState<boolean>(false);
  const handleShowModalAddEvent = () => setShowModalAddEvent((prev) => !prev);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  function handleColor(color: string): void {
    setSelectedColor(color);
  }

  async function createEventTemplate(
    data: CreateModelEventFormData
  ): Promise<void> {

    if (!data.name || data.name.length < 2) {
      toast.error("Digite um nome para o template!");
      return;
    }

    if(!selectedColor) {
      toast.error("Escolha uma cor para o template!")
      return;
    }

    const { data: eventsTemplatesData } = await api.post(
      "/events-templates/create",
      { ...data, color: selectedColor }
    );

    queryClient.invalidateQueries(["events-templates"]);
  }

  return {
    model: {
      showModalAddEvent,
      handleShowModalAddEvent,
    },
    form: {
      control,
      handleSubmit,
      createEventTemplate,
      reset,
      errors,
    },
    colors: {
      handleColor,
    },
  };
};

export default function Header() {
  const {
    model: { showModalAddEvent, handleShowModalAddEvent },
    form: { control, handleSubmit, createEventTemplate, reset, errors },
    colors: { handleColor },
  } = useHeader();

  return (
    <div className="flex flex-col w-full min-h-auto z-[2]">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className=" w-full items-center flex justify-between rounded-md"
      >

        <motion.div className="flex gap-2 items-center relative ">
          <button
            onClick={handleShowModalAddEvent}
            className="opacity-90 flex gap-3 items-center hover:opacity-100 text-white p-3 bg-cyan-500 rounded px-6"
          >
            <MdBackupTable />
            Eventos Finalizados
          </button>
          <button
            onClick={handleShowModalAddEvent}
            className="opacity-90 flex gap-3 items-center hover:opacity-100 text-white p-3 bg-cyan-500 rounded px-6"
          >
            <MdBackupTable />
            Novo modelo
          </button>
          <Link
            href={"/calendar/week"}
            className="opacity-90 flex gap-2 items-center hover:opacity-100 text-white p-3 bg-cyan-500 rounded px-6"
          >
            <BsCalendar2Week />
            Minha semana
          </Link>
          <Link
            href={"/calendar"}
            className="opacity-90 flex items-center gap-2 hover:opacity-100 p-3 px-6 text-white rounded bg-gradient-45 from-purple-600 to-cyan-500"
          >
            <IoAddSharp size="20" />
            Criar
          </Link>
        </motion.div>
      </motion.header>
      <Modal
        onOpenChange={handleShowModalAddEvent}
        isDismissable={false}
        isOpen={showModalAddEvent}
        className="bg-zinc-900 z-30"
      >
        <ModalContent className="flex">
          <ModalHeader className="flex flex-col gap-1">
            Novo Template
          </ModalHeader>
          <form onSubmit={handleSubmit(createEventTemplate)}>
            <ModalBody>
              <p>
                Para register um novo modelo, digite as informações necessárias
                abaixo:
              </p>

              <Controller
                defaultValue=""
                name={"name"}
                control={control}
                render={({ field }) => (
                  <input
                    className="p-3 border border-zinc-600 bg-zinc-800 rounded outline-none"
                    {...field}
                    autoComplete="off"
                    placeholder={"Digite um nome..."}
                  />
                )}
              />
              <Controller
                defaultValue=""
                name={"description"}
                control={control}
                render={({ field }) => (
                  <textarea
                    className="p-3 border h-[10rem] resize-none border-zinc-600 bg-zinc-800 rounded outline-none"
                    {...field}
                    autoComplete="off"
                    placeholder={"Digite uma descrição..."}
                  />
                )}
              />
              <span className="text-lg font-semibold">Escolha uma cor:</span>
              <InputColors colors={colors} handle={handleColor} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="rounded-lg opacity-80 hover:opacity-100"
                onClick={() => null}
              >
                Fechar
              </Button>
              <Button
                color="danger"
                className="rounded-lg bg-emerald-400 opacity-80 hover:opacity-100"
                type="submit"
              >
                Enviar!
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
