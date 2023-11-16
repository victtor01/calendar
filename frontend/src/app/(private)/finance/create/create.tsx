"use client";

import { formDataLabel, FormDataLabel } from "../formData";
import Label from "@/components/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoAlertCircleSharp } from "react-icons/io5";
import Button from "@/components/button";
import { useRef, useState } from "react";
import useApiPrivate from "@/hooks/apiPrivate";
import { Accounts, useAccounts } from "@/hooks/useAccounts";
import { motion } from "framer-motion";

type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;
type OptionFinance = "INCOME" | "EXPENSE";

const createRegisterFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  value: z.string().nonempty("Preencha o valor!"),
  description: z.string(),
  date: z.string().refine((value) => new Date(value)),
});

const useCreate = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  });

  const api = useApiPrivate();

  const [optionFinance, setOptionFinance] = useState<OptionFinance>("INCOME");
  const [optionAccount, setOptionAccount] = useState<Accounts | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [onSuccessMessage, setOnSuccessMesage] = useState<string | null>(null);

  const onChangeOptionAccount = (item: any) => {
    setOptionAccount(item);
    handleOptionAccount();
  };

  const refOptionAccount = useRef<HTMLDivElement | null>(null);
  const handleOptionAccount = () => {
    if (refOptionAccount.current) {
      refOptionAccount.current.style.display =
        refOptionAccount.current.style.display === "flex" ? "none" : "flex";
    }
  };

  const classOptionFinance =
    optionFinance === "INCOME" ? "bg-emerald-400" : "bg-red-300";

  const handleOptionfinance = () =>
    setOptionFinance((prev) => (prev === "INCOME" ? "EXPENSE" : "INCOME"));

  async function createRegister(formData: CreateRegisterFormData) {
    setErrorMessage(null);
    reset({
      name: "",
      value: "",
      description: "",
      date: "",
    });

    if (!optionAccount) {
      setErrorMessage("Selecione uma opção para conta!");
      return;
    }

    const type = optionFinance;
    const { id: accountId } = optionAccount;

    const data = {
      ...formData,
      accountId,
      type,
    };

    try {
      await api.post("/registers/create", data);
      setOnSuccessMesage("enviado com sucesso!");
    } catch (error) {
      setErrorMessage("Houve um erro inesperado, tente novamente mais tarde!");
    }
  }

  return {
    form: {
      control,
      handleSubmit,
      createRegister,
      handleOptionfinance,
    },
    utils: {
      handleOptionAccount,
      onChangeOptionAccount,
      refOptionAccount,
    },
    styles: {
      button: {
        classOptionFinance,
      },
    },
    events: {
      onSuccessMessage,
      errorMessage,
      errors,
    },
    data: {
      optionFinance,
      optionAccount,
    },
  };
};

export const Create = () => {
  const {
    form: { control, handleSubmit, createRegister, handleOptionfinance },
    utils: { handleOptionAccount, onChangeOptionAccount, refOptionAccount },
    events: { onSuccessMessage, errorMessage, errors },
    data: { optionFinance, optionAccount },
    styles: {
      button: { classOptionFinance },
    },
  } = useCreate();

  const { accounts } = useAccounts().getAccounts();

  return (
    <form
      onSubmit={handleSubmit(createRegister)}
      className="flex flex-col p-2 items-center"
    >
      {onSuccessMessage && (
        <div className="p-5 w-full bg-emerald-100 border border-green-200 rounded text-lg text-gray-700 font-semibold">
          {onSuccessMessage}
        </div>
      )}
      {errorMessage && (
        <div className="p-5 w-full bg-red-100 border border-red-200 rounded text-lg text-gray-700 font-semibold">
          {errorMessage}
        </div>
      )}
      {formDataLabel.map(
        ({ name, span, ex, type, input }: FormDataLabel, index: number) => {
          const classError = errors[name as keyof CreateRegisterFormData]
            ? "shadow-[0_0_0_1px] shadow-red-400 focus:border-none"
            : "shadow-none";
          return (
            <Label.Content key={`${name}-${index}`} className="mb-4">
              <span className="text-[1rem] font-semibold opacity-60">
                {span}
              </span>
              <Controller
                name={name as keyof CreateRegisterFormData}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type={type}
                    {...field}
                    className={`${classError} outline-none placeholder:opacity-40 rounded appearance-none focus:shadow rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5`}
                    autoComplete="off"
                    placeholder={`exp: ${ex}`}
                  />
                )}
              />
              {errors[name as keyof CreateRegisterFormData] && (
                <span className="opacity-90 text-red-400 text-normal flex gap-1 items-center">
                  <IoAlertCircleSharp />
                  {errors[name as keyof CreateRegisterFormData]?.message}
                </span>
              )}
            </Label.Content>
          );
        }
      )}
      <span className="text-[1rem] font-semibold opacity-60 w-full">
        Descrição
      </span>
      <Controller
        name={"description"}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            name="description"
            style={{ resize: "none" }}
            placeholder="Escreva um breve resumo sobre o registro..."
            className="bg-transparent focus:border-cyan-500 w-full min-h-[10rem] outline-none rounded p-2 text-xl"
          />
        )}
      />
      <div className="flex flex-col relative w-full my-3">
        <span className="text-[1rem] font-semibold opacity-60">
          Selecione a conta
        </span>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleOptionAccount}
          type="button"
          className="bg-zinc-400 bg-opacity-10 text-lg font-semibold w-full text-zinc-400 flex p-4 rounded"
        >
          {optionAccount?.name || "Nenhuma conta selecionada!"}
        </motion.button>
        <motion.div
          ref={refOptionAccount}
          className="hidden overflow-auto text-white flex flex-col absolute top-[100%] h-[8rem] rounded mt-2 z-10 shadow-lg bg-zinc-500 bg-opacity-70 backdrop-blur-lg w-full"
        >
          {accounts &&
            accounts!.map((item: Accounts, index: number) => (
              <button
                key={index}
                onClick={() => onChangeOptionAccount(item)}
                type="button"
                className="w-full flex p-3 opacity-60 hover:opacity-100 bg-zinc-900 bg-opacity-50"
              >
                {item.name}
              </button>
            ))}
        </motion.div>
      </div>
      <div className="flex gap-2 items-center w-full justify-between">
        <Button
          type="button"
          className="bg-cyan-500 rounded text-white"
          onClick={handleOptionfinance}
        >
          Mudar
        </Button>
        <div
          className={`text-white transition-colors duration-300 p-3 h-full min-w-[7rem] rounded justify-center flex items-center ${classOptionFinance}`}
        >
          {optionFinance === "INCOME" ? "Entrada" : "Saída"}
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="z-2 text-white font-semibold text-lg bg-gradient-45 from-purple-500 to-blue-500 w-full mt-4 py-4 rounded"
      >
        Enviar
      </motion.button>
    </form>
  );
};
