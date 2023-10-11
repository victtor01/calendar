"use client"
import Button from "@/components/button";
import { FormDataLabel, formDataLabel } from "./data-label";
import Label from "@/components/label";
import Input from "@/components/input/input";
import { IoAlertCircleSharp } from "react-icons/io5";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { fontRoboto } from "@/app/fonts";

type CreateAccountFormData = z.infer<typeof createAccountFormSchema>;

const createAccountFormSchema = z.object({
    name: z.string().nonempty()
});

export const useCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormSchema),
  });

  return {
    errors,
    register,
    handleSubmit,
  };
};

export default function Create() {
  const { errors, register, handleSubmit } = useCreate();

  return (
    <div className={`flex flex-col w-auto min-w-[28rem] mx-auto my-20`}>
    <header
      className={`${fontRoboto} overflow-auto p-2 flex items-center gap-3`}
    >
      <Link
        href={"/finance/accounts"}
        className="bg-sky-200 p-2 px-3 rounded opacity-70 hover:opacity-100 "
      >
        minhas contas
      </Link>
    </header>
    <div className="p-2 text-2xl text-cyan-900">
      <h2>Criar uma nova conta</h2>
    </div>
    <form className="flex flex-col p-2 items-center">
      {formDataLabel.map(({ name, span, ex, type }: FormDataLabel) => {
        const classError = errors[name as keyof CreateAccountFormData]
          ? "shadow-[0_0_0_1px] shadow-red-400 focus:border-none"
          : "shadow-none";
        return (
          <Label.Content key={`${name}-${span}-${ex}`} className="mb-4">
            <span className="text-[1rem] font-semibold opacity-60">{span}</span>
            <Input
              type={type}
              register={register(name as keyof CreateAccountFormData)}
              className={`${classError} border focus:border-cyan-600 placeholder:opacity-40 rounded appearance-none px-3e`}
              autoComplete="off"
              placeholder={`exp: ${ex}`}
            />
            {errors[name as keyof CreateAccountFormData] && (
              <span className="opacity-90 text-red-400 text-normal flex gap-1 items-center">
                <IoAlertCircleSharp />
                {errors[name as keyof CreateAccountFormData]?.message}
              </span>
            )}
          </Label.Content>
        );
      })}
      <Button
        type="submit"
        className="text-white font-semibold text-lg bg-gradient-to-r from-cyan-500 via-cyan-400 to-sky-400 w-full mt-4 py-3 rounded"
      >
        ENVIAR
      </Button>
    </form>
  </div>
  );
}
