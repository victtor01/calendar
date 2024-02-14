"use client";

import api from "@/api";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { toast } from "react-toastify";

const useRedefinePassword = () => {
  const [email, setEmail] = useState<string>("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void =>
    setEmail(e.target.value);

  const router = useRouter();

  const submit = async () => {
    // if not email.

    if (!email) {
      toast.error("Campo email Obrigatório!");
      return;
    }

    // request of send email

    try {
      const response = api.post("/users/send-email-redefine-password", {
        email,
      });

      // if error
      const data = await (await toast.promise(response, {
        pending: "Enviando email...",
        error: "Houve um erro, tente novamente mais tarde!",
        success: "Email enviado com sucesso!",
      })).data || null;

      if (!data?.message || data.error) {
        if (data?.message) {
          toast.error(data.message);
          return;
        }
        toast.error("Houve um erro, tente novamente mais tarde!");
      }

      if (data?.error && data?.error === false) {
        toast.success("Email de recupareção enviado com sucesso!");
        return;
      }
    } catch (error) {
      toast.error(
        "Houve um erro, verifique o campo email e tente novamente mais tarde!"
      );
    } finally {
      router.push("/login");
    }

    // redirect
  };

  return {
    email,
    onChangeEmail,
    submit,
  };
};

export default function RefinePassword() {
  const { email, onChangeEmail, submit } = useRedefinePassword();
  return (
    <main className="w-full h-screen flex">
      <div className="flex flex-col gap-6 m-auto justify-center items-center">
        <header className="flex flex-col gap-1 text-center">
          <h1 className="text-xl font-semibold">
            Digite seu email para recuperar sua senha!
          </h1>
          <h1 className="text-lg">Enviaremos um link para o seu email.</h1>
        </header>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="input form" className="flex flex-col gap-2 w-full">
            <input
              onChange={onChangeEmail}
              value={email}
              type="text"
              placeholder="Email"
              className="w-full p-3 bg-zinc-100 dark:bg-zinc-800 outline-none rounded"
            />
          </label>
          <button
            onClick={submit}
            type="button"
            className="text-white bg-indigo-600 p-3 w-full rounded opacity-80 hover:opacity-100"
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}
