"use client";
import Input from "@/components/input/input";
import { formDataLabel, FormDataLabel } from "./formData";
import Label from "@/components/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoAlertCircleSharp } from "react-icons/io5";
import Button from "@/components/button";
import { useRef, useState } from "react";
import useApiPrivate from "@/hooks/apiPrivate";
import { Accounts, useAccounts } from "@/hooks/useAccounts";

type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;
type OptionFinance = "INCOME" | "EXPENSE";

const createRegisterFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  value: z.string().nonempty("Preencha o valor!"),
  description: z.string(),
  date: z
    .string()
    .refine((value) => new Date(value)),
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

    try {
      const data = {
        ...formData,
        accountId,
        type,
      };

      await api.post("/registers/create", data);

      setOnSuccessMesage("enviado com sucesso!");
    } catch (error) {
      setErrorMessage("Houve um erro inesperado, tente novamente mais tarde!");
    }
  }

  return {
    control,
    handleSubmit,
    createRegister,
    handleOptionfinance,
    handleOptionAccount,
    onChangeOptionAccount,
    classOptionFinance,
    onSuccessMessage,
    refOptionAccount,
    optionFinance,
    optionAccount,
    errors,
    errorMessage,
  };
};

export const Create = () => {
  const {
    control,
    handleSubmit,
    createRegister,
    handleOptionfinance,
    handleOptionAccount,
    onChangeOptionAccount,
    onSuccessMessage,
    classOptionFinance,
    refOptionAccount,
    optionFinance,
    optionAccount,
    errors,
    errorMessage,
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
                  <Input
                    type={type}
                    register={field}
                    className={`${classError} border focus:border-cyan-600 placeholder:opacity-40 rounded appearance-none px-3e`}
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
            className="bg-transparent border border-zinc-500 border-opacity-40 focus:border-cyan-500 w-full min-h-[10rem] outline-none rounded p-2 text-xl"
          />
        )}
      />
      <div className="flex flex-col relative w-full my-3">
        <span className="text-[1rem] font-semibold opacity-60">
          Selecione a conta
        </span>
        <button
          onClick={handleOptionAccount}
          type="button"
          className="bg-transparent border border-zinc-500 border-opacity-40 text-lg font-semibold w-full text-zinc-400 flex p-4 rounded"
        >
          {optionAccount?.name || "Nenhuma conta selecionada!"}
        </button>
        <div
          ref={refOptionAccount}
          className="hidden overflow-auto text-white flex flex-col absolute top-[100%] h-[8rem] rounded mt-2 z-10 shadow-lg p-2 bg-zinc-700 w-full"
        >
          {accounts &&
            accounts!.map((item: Accounts, index: number) => (
              <button
                key={index}
                onClick={() => onChangeOptionAccount(item)}
                type="button"
                className="w-full flex p-2 hover:bg-cyan-500 rounded"
              >
                {item.name}
              </button>
            ))}
        </div>
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
      <Button
        type="submit"
        className="z-2 text-white font-semibold text-lg bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-400 w-full mt-4 py-4 rounded"
      >
        ENVIAR
      </Button>
    </form>
  );
};
