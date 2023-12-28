"use client";

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
import { IoAddSharp, IoHome, IoList } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { colorsEvents as colors } from "@/constants/colorsEvents";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import * as S from './style';

type CreateModelEventFormData = z.infer<typeof createModelEventFormSchema>;

const createModelEventFormSchema = z.object({
  name: z.string(),
  color: z.string(),
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

  async function createEventTemplate(
    data: CreateModelEventFormData
  ): Promise<void> {
    if (!data.name || data.name.length < 2) {
      toast.error("Digite um nome para o template!");
      return;
    }

    const { data: eventsTemplatesData } = await api.post(
      "/events-templates/create",
      data
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
  };
};

const before = `
  bg-zinc-900 
  bottom-0
  h-[0.2rem]
  dark:bg-white
  absolute
  left-[50%]
  translate-x-[-50%] 
`;

const links = {
  week: {
    icon: BsCalendar2Week,
    path: "/calendar/week",
  },
  home: {
    icon: IoHome,
    path: "/calendar",
  },
  list: {
    icon: IoList,
    path: "/calendar/list",
  },
};

export default function Header() {
  const {
    model: { showModalAddEvent, handleShowModalAddEvent },
    form: { control, handleSubmit, createEventTemplate, reset, errors },
  } = useHeader();

  const pathName = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "linear", duration: 0.3 }}
      className="flex min-h-auto z-[2] w-auto bg-blue-100 bg-opacity-50 dark:bg-zinc-900 dark:bg-opacity-50 justify-between items-center relative m-1 rounded-xl"
    >
      <S.Bubble className="overflow-hidden rounded-xl"/>
      <header className=" flex rounded-md items-center mx-auto">
        <div className="flex gap-2 relative mx-auto flex-1">
          <button className="h-14 w-14 px-4 flex justify-center items-center opacity-100 relative">
            <IoAddSharp size="23" />
          </button>
          {Object.entries(links).map(([key, value]: any, index: number) => {
            const Icon = value.icon;
            const selected = pathName === value.path;

            return (
              <Link
                href={value.path}
                className="h-14 w-14 px-4 flex justify-center items-center opacity-100 relative"
                key={index}
                onClick={value.onclick}
              >
                <Icon size="20" />
                <AnimatePresence>
                  {selected && (
                    <motion.span
                      key={`span-${key}`}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className={before}
                    />
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
          <motion.button
            className="h-14 w-14 px-4 flex justify-center items-center opacity-100 relative"
            onClick={handleShowModalAddEvent}
          >
            <MdBackupTable size="21" />
          </motion.button>
        </div>
      </header>
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
              <Controller
                name="color"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <div className="flex gap-3">
                    {colors?.map((color: string) => (
                      <button
                        type="button"
                        className="w-8 h-8 rounded-md opacity-80 flex items-center justify-center transition-all"
                        key={color}
                        onClick={() => {
                          field.onChange(color);
                        }}
                        style={{
                          background: color,
                        }}
                      >
                        {field.value === color && <FaCheck size="16" />}
                      </button>
                    ))}
                  </div>
                )}
              />
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
                onClick={handleShowModalAddEvent}
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
    </motion.div>
  );
}
