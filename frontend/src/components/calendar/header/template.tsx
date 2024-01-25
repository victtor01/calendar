"use client";

import { motion } from "framer-motion";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { MdBackupTable } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { colorsEvents } from "@/constants/colorsEvents";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { queryClient } from "@/hooks/queryClient";
import useApiPrivate from "@/hooks/apiPrivate";

type CreateModelTemplateFormData = z.infer<
  typeof createModelTemplateFormSchema
>;

const createModelTemplateFormSchema = z.object({
  name: z.string(),
  color: z.string(),
  description: z.string(),
});

function useDialogTemplate() {
  const api = useApiPrivate();
  const [showModalAddTemplate, setShowModalAddTemplate] = useState(false);
  const handleShowModalAddTemplate = () =>
    setShowModalAddTemplate((prev) => !prev);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateModelTemplateFormData>({
    resolver: zodResolver(createModelTemplateFormSchema),
  });

  async function createTemplate(
    data: CreateModelTemplateFormData
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
    showModalAddTemplate,
    handleShowModalAddTemplate,
    form: {
      createTemplate,
      control,
      handleSubmit,
      reset,
    },
  };
}

export const TemplateDialog = () => {
  const {
    showModalAddTemplate,
    handleShowModalAddTemplate,
    form: { createTemplate, control, handleSubmit, reset },
  } = useDialogTemplate();

  return (
    <>
      <motion.button
        className={`h-12 w-auto px-4 gap-2 rounded-md text-md font-semibold capitalize flex justify-center transition-background items-center opacity-100 relative `}
        onClick={handleShowModalAddTemplate}
      >
        <MdBackupTable size="21" />
        Novo template
      </motion.button>
      <Modal
        onOpenChange={handleShowModalAddTemplate}
        isDismissable={false}
        isOpen={showModalAddTemplate}
        className="bg-zinc-900 z-30"
      >
        <ModalContent className="flex">
          <ModalHeader className="flex flex-col gap-1">
            Novo Template
          </ModalHeader>
          <form onSubmit={handleSubmit(createTemplate)}>
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
                    {colorsEvents?.map((color: string) => (
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
                onClick={handleShowModalAddTemplate}
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
    </>
  );
};
