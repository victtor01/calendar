"use client";
import Input from "@/components/input/input";
import { formDataLabel, FormDataLabel } from "./formData";
import Label from "@/components/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoAlertCircleSharp } from "react-icons/io5";
import Button from "@/components/button";
import { useState } from "react";
import useApiPrivate from "@/hooks/apiPrivate";

type CreateRegisterFormData = z.infer<typeof createRegisterFormSchema>;
type OptionFinance = "income" | "expense";

const createRegisterFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  value: z.string().nonempty("Preencha o valor!"),
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

  const [optionFinance, setOptionFinance] = useState<OptionFinance>("income");

  const classOptionFinance =
    optionFinance === "income" ? "bg-emerald-400" : "bg-red-300";

  const handleOptionfinance = () =>
    setOptionFinance((prev) => (prev === "income" ? "expense" : "income"));

  async function createRegister(data: CreateRegisterFormData) {
    // console.log(data);
    // const res = await api.post("/accounts/create", data);
    // console.log(res);
  }

  return {
    register,
    handleSubmit,
    createRegister,
    handleOptionfinance,
    classOptionFinance,
    optionFinance,
    errors,
  };
};

export const Create = () => {
  const {
    register,
    handleSubmit,
    createRegister,
    handleOptionfinance,
    classOptionFinance,
    optionFinance,
    errors,
  } = useCreate();

  return (
    <form
      onSubmit={handleSubmit(createRegister)}
      className="flex flex-col p-2 items-center"
    >
      {formDataLabel.map(({ name, span, ex, type }: FormDataLabel) => {
        const classError = errors[name as keyof CreateRegisterFormData]
          ? "shadow-[0_0_0_1px] shadow-red-400 focus:border-none"
          : "shadow-none";
        return (
          <Label.Content key={`${name}-${span}-${type}`} className="mb-4">
            <span className="text-[1rem] font-semibold opacity-60">{span}</span>
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
      })}
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
          {optionFinance === "income" ? "Entrada" : "Saída"}
        </div>
      </div>
      <Button
        type="submit"
        className="text-white font-semibold text-lg bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-400 w-full mt-4 py-4 rounded"
      >
        ENVIAR
      </Button>
    </form>
  );
};
