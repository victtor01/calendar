"use client";
import Input from "@/components/input/input";
import { formDataLabel, FormDataLabel } from "./formData";
import Label from "@/components/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
    .nonempty("Defina a data corretamente!")
    .refine((value) => new Date(value)),
});

const useCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  });

  const api = useApiPrivate();

  const [optionFinance, setOptionFinance] = useState<OptionFinance>("INCOME");
  const [optionAccount, setOptionAccount] = useState<Accounts | null>(null);
  const onChangeOptionAccount = (item: any) => {
    setOptionAccount(item);
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

  async function createRegister(data: CreateRegisterFormData) {
    console.log(data);
    console.log(optionAccount?.id);
    console.log(optionFinance);

    const datas = {
      ...data,
      type: optionFinance,
      accountId: optionAccount?.id,
    };

    console.log(data);

    const res = await api.post("/registers/create", datas);
    console.log(res);
    // console.log(data);
    // const res = await api.post("/accounts/create", data);
    // console.log(res);
  }

  return {
    register,
    handleSubmit,
    createRegister,
    handleOptionfinance,
    handleOptionAccount,
    onChangeOptionAccount,
    classOptionFinance,
    refOptionAccount,
    optionFinance,
    optionAccount,
    errors,
  };
};

export const Create = () => {
  const {
    register,
    handleSubmit,
    createRegister,
    handleOptionfinance,
    handleOptionAccount,
    onChangeOptionAccount,
    classOptionFinance,
    refOptionAccount,
    optionFinance,
    optionAccount,
    errors,
  } = useCreate();

  const { accounts } = useAccounts().getAccounts();

  return (
    <form
      onSubmit={handleSubmit(createRegister)}
      className="flex flex-col p-2 items-center min-h-auto"
    >
      {formDataLabel.map(
        ({ name, span, ex, type, input}: FormDataLabel, index: number) => {
          const classError = errors[name as keyof CreateRegisterFormData]
            ? "shadow-[0_0_0_1px] shadow-red-400 focus:border-none"
            : "shadow-none";
          return (
            <Label.Content key={`${name}-${index}`} className="mb-4">
              <span className="text-[1rem] font-semibold opacity-60">
                {span}
              </span>
              <Input
                type={type}
                register={register(name as keyof CreateRegisterFormData)}
                className={`${classError} border focus:border-cyan-600 placeholder:opacity-40 rounded appearance-none px-3e`}
                autoComplete="off"
                placeholder={`exp: ${ex}`}
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
      <div className="flex flex-col relative w-full mb-3">
        <span className="text-[1rem] font-semibold opacity-60">
          Selecione a conta
        </span>
        <button
          onClick={handleOptionAccount}
          type="button"
          className=" text-lg font-semibold w-full text-zinc-700 border flex p-4 rounded"
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
