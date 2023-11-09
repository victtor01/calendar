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
import * as S from "./style";
import { MdBackupTable } from "react-icons/md";
import { BsCalendar2Week } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";

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

  const createEventTemplate = async (data: CreateModelEventFormData) => {
    const { data: eventsTemplatesData } = await api.post(
      "/events-templates/create",
      data
    );

    queryClient.invalidateQueries(["events-templates"]);

    console.log(eventsTemplatesData);
  };

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

export default function Header() {
  const {
    model: { showModalAddEvent, handleShowModalAddEvent },
    form: { control, handleSubmit, createEventTemplate, reset, errors },
  } = useHeader();

  return (
    <div className="flex flex-col w-full h-full min-h-auto ">
      <S.Header className=" w-full items-center flex justify-between p-2 rounded-md shadow">
        <div className="p-2 opacity-60 text-lg font-semibold">Calendário</div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleShowModalAddEvent}
            className="opacity-90 flex gap-3 items-center hover:opacity-100 text-white p-3 bg-cyan-600 rounded-md "
          >
            <MdBackupTable />
            Novo modelo
          </button>
          <Link
            href={"/calendar/week"}
            className="opacity-90 flex gap-2 items-center hover:opacity-100 text-white p-3 bg-cyan-600 rounded-md "
          >
            <BsCalendar2Week />
            Minha semana
          </Link>
          <Link
            href={"/calendar"}
            className="opacity-90 flex items-center gap-2 hover:opacity-100 p-3 text-white rounded-md bg-gradient-to-r from-rose-500 to-fuchsia-600"
          >
            <IoAddSharp size="20" />
            Criar
          </Link>
        </div>
      </S.Header>
      <Modal
        onOpenChange={handleShowModalAddEvent}
        isDismissable={false}
        isOpen={showModalAddEvent}
        className="bg-zinc-900"
      >
        <ModalContent className="flex">
          <ModalHeader className="flex flex-col gap-1">
            Criar novo item
          </ModalHeader>
          <form onSubmit={handleSubmit(createEventTemplate)}>
            <ModalBody>
              <p>
                Para register um novo modelo, digite as informações necessárias
                abaixo:
              </p>
              <div className="flex flex-col w-full gap-2">
                {["name", "description"].map((name: string, index: number) => (
                  <Controller
                    defaultValue=""
                    key={index}
                    name={name as keyof CreateModelEventFormData}
                    control={control}
                    render={({ field }) => (
                      <input
                        className="p-3 border border-zinc-600 bg-zinc-800 rounded outline-none"
                        {...field}
                        autoComplete="off"
                        placeholder={name}
                      />
                    )}
                  />
                ))}
              </div>
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
