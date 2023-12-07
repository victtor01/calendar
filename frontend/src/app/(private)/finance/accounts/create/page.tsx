"use client";

import Button from "@/components/button";
import { FormDataLabel, formDataLabel } from "./data-label";
import Label from "@/components/label";
import { IoAlertCircleSharp } from "react-icons/io5";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { fontOpenSans, fontRoboto } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import * as S from "./style";
import { BsArrowLeft } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { queryClient } from "@/hooks/queryClient";
import Spinner from "@/components/spinner";
import { ToastContainer, toast } from "react-toastify";

type CreateAccountFormData = z.infer<typeof createAccountFormSchema>;

const createAccountFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  description: z.string(),
});

const useCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormSchema),
  });

  const api = useApiPrivate();

  const createAccounts = async (data: CreateAccountFormData) => {
    await api.post("/accounts/create", data);
    toast.success("Nova conta criada com sucesso!");
    queryClient.refetchQueries(["accounts"]);
    reset();
  };

  return {
    errors,
    register,
    handleSubmit,
    isSubmitting,
    createAccounts,
  };
};

const Create = () => {
  const { errors, register, handleSubmit, isSubmitting, createAccounts } =
    useCreate();

  return (
    <S.Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex rounded flex-col w-auto flex min-w-[28rem] m-auto ${fontOpenSans}`}
    >
      <header
        className={`${fontRoboto} overflow-auto p-2 flex items-center gap-3 bg-zinc-300 bg-opacity-5`}
      >
        <Link
          href={"/finance/accounts"}
          className="flex items-center gap-3 p-1 hover:gap-4 transition-[gap] text-lg rounded opacity-70 hover:opacity-100 "
        >
          <BsArrowLeft />
          Minhas Contas
        </Link>
      </header>
      <div className="p-2 text-xl flex items-center gap-3 opacity-50">
        <FaCreditCard size="20" />
        <h2>Criar nova conta</h2>
      </div>
      <form
        className="flex flex-col p-2 items-center"
        onSubmit={handleSubmit(createAccounts)}
      >
        {formDataLabel.map(({ name, span, ex, type }: FormDataLabel) => {
          const classError = errors[name as keyof CreateAccountFormData]
            ? "shadow-[0_0_0_1px] shadow-red-400 focus:border-none"
            : "shadow-none";
          return (
            <Label.Content key={`${name}-${span}-${ex}`} className="mb-4">
              <span className="text-[1rem] font-semibold opacity-60">
                {span}
              </span>
              <input
                type={type}
                {...register(name as keyof CreateAccountFormData)}
                className={`${classError} outline-none placeholder:opacity-40 rounded appearance-none focus:shadow rounded-md transition-shadow p-4 outline-none bg-zinc-400 bg-opacity-5`}
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
          className="text-white font-semibold text-lg bg-gradient-45 from-purple-500 to-cyan-500 w-full mt-4 py-3 rounded"
        >
          {isSubmitting ? <Spinner /> : "Enviar"}
        </Button>
      </form>
    </S.Container>
  );
};

export default Create;
