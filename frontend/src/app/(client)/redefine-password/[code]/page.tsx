"use client";

import api from "@/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface RedifinePasswordProps {
  params: {
    code: string;
  };
}

const RedefinePasswordSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
  repeatPassword: z.string().min(1),
});

type TypeRedefinePassword = z.infer<typeof RedefinePasswordSchema>;

const useRedefinePassword = (code: string) => {
  const { register, handleSubmit } = useForm<TypeRedefinePassword>({
    resolver: zodResolver(RedefinePasswordSchema),
  });

  const router = useRouter();

  const updatePassword = async (data: TypeRedefinePassword) => {
    console.log(data, code);

    try {
      const response = await api.post("/users/redefine-password", {
        ...data,
        code,
      });

      if (response.status === 201) {
        toast.success("Dados atualizados com sucesso! faça o login.");
        router.push("/login/");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    form: {
      register,
      handleSubmit,
      updatePassword,
    },
  };
};

export default function RedifinePassowrd({ params }: RedifinePasswordProps) {
  const {
    form: { register, handleSubmit, updatePassword },
  } = useRedefinePassword(params.code);

  return (
    <form
      className="m-auto flex flex-col gap-6 w-full max-w-[35rem]"
      onSubmit={handleSubmit(updatePassword)}
    >
      <div className="w-[20rem]">
        <h1 className="font-semibold text-xl">
          Digite as informações para redefinir a sua senha.
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        <label className="grid grid-cols-2 gap-3 items-center">
          <span className="font-semibold">Confirme seu e-mail:</span>
          <input
            {...register("email")}
            type="text"
            className="p-3 rounded bg-zinc-100 dark:bg-zinc-800 px-4 w-full max-w-[20rem] outline-none border border-transparent focus:border-indigo-600"
            placeholder="Email"
          />
        </label>
        <label className="grid grid-cols-2 gap-3 items-center">
          <span className="font-semibold">Digite sua nova senha:</span>
          <input
            {...register("password")}
            type="password"
            className="p-3 rounded bg-zinc-100 dark:bg-zinc-800 px-4 w-full max-w-[20rem] outline-none focus:border border border-transparent focus:border-indigo-600"
            placeholder="Senha"
          />
        </label>
        <label className="grid grid-cols-2 gap-3 items-center">
          <span className="font-semibold">Confirme sua nova senha:</span>
          <input
            {...register("repeatPassword")}
            type="password"
            className="p-3 rounded bg-zinc-100 dark:bg-zinc-800 px-4 w-full max-w-[20rem] outline-none focus:border border border-transparent focus:border-indigo-600"
            placeholder="Repita a senha"
          />
        </label>
      </div>
      <button className="bg-indigo-600 p-3 rounded font-semibold opacity-90 hover:opacity-100">
        Enviar
      </button>
    </form>
  );
}
