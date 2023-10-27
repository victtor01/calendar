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

type CreateModelEventFormData = z.infer<typeof createModelEventFormSchema>;

const createModelEventFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const useLayout = () => {
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
    const { data: eventsTemplatesData } = await api.post("/events-templates/create", data)

    queryClient.invalidateQueries(['events-templates'])

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

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    model: { showModalAddEvent, handleShowModalAddEvent },
    form: { control, handleSubmit, createEventTemplate, reset, errors },
  } = useLayout();

  return (
    <div className="flex flex-col w-full h-full min-h-auto">
      <header className=" w-full items-center flex justify-between rounded bg-transparent p-2 ">
        <div className="opacity-70">
          <Link
            href={"/calendar"}
            className="opacity-80 hover:opacity-100 rounded p-3 text-white bg-cyan-600"
          >
            Calendário
          </Link>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleShowModalAddEvent}
            className="opacity-90 hover:opacity-100 text-white rounded p-3 bg-cyan-600 "
          >
            Novo modelo
          </button>
          <Link
            href={"/calendar/week"}
            className="opacity-90 hover:opacity-100 text-white rounded p-3 bg-cyan-600 "
          >
            Minha semana
          </Link>
          <Link
            href={"/calendar"}
            className="opacity-90 hover:opacity-100 rounded p-3 text-white bg-gradient-to-r from-rose-500 to-fuchsia-600"
          >
            Novo evento
          </Link>
        </div>
      </header>
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
      {children}
    </div>
  );
}
