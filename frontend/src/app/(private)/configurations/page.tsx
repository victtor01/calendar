"use client";

import { Server } from "@/constants/server";
import { useSessionContext } from "@/contexts/sessionContext";
import Image from "next/image";

export default function Configurations() {
  const {
    userInfo: { photo, firstName, email, cpf },
  } = useSessionContext();

  return (
    <main className="m-auto w-full flex-col flex gap-5">
      <div className="flex flex-col bg-white dark:bg-zinc-900 dark:shadow-black shadow-md">
        <header className="flex w-full justify-between bg-indigo-600 text-white">
          <div className="p-3 font-semibold">Configurações da conta.</div>
        </header>
        <div className="p-2 flex flex-col">
          <div className="w-full p-2 ">
            <h1 className="capitalize font-semibold text-gray-600 text-lg">
              {" "}
              Informações do usuário.{" "}
            </h1>
          </div>
          <div className="flex px-2 gap-3 flex-wrap">
            <div className="flex flex-1">
              <div className="bg-gradient-45 border-2 border-zinc-600 shadow-inner from-purple-600 to-blue-600 w-[6rem] h-[6rem] relative overflow-hidden opacity-90">
                <Image
                  src={`${Server}/uploads/${photo}`}
                  sizes="(max-width: 6rem) 6rem, 1200px"
                  fill
                  quality={100}
                  style={{ objectFit: "cover" }}
                  alt="Foto do usuario"
                />
              </div>
            </div>

            <label htmlFor="Nome" className="flex flex-col flex-1">
              <span className="text-gray-600 dark:text-gray-100 font-semibold">
                Nome:
              </span>
              <div className="flex text-lg text-bold text-gray-600 dark:text-white font-bold">
                {firstName}
              </div>
            </label>

            <label htmlFor="Sobrenome" className="flex flex-col flex-1">
              <span className="text-gray-600 dark:text-gray-100 font-semibold">
                Email:
              </span>
              <div className="flex text-lg text-bold text-gray-600 dark:text-white font-bold">
                {email || "-"}
              </div>
            </label>

            <label htmlFor="Sobrenome" className="flex flex-col flex-1">
              <span className="text-gray-600 dark:text-gray-100 font-semibold">
                CPF:
              </span>
              <div className="flex text-lg text-bold text-gray-600 dark:text-white font-bold">
                {cpf || "-"}
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-zinc-800 shadow-md">
        <header className="flex w-full justify-between bg-indigo-600 text-white">
          <div className="p-3 font-semibold">Meu plano.</div>
        </header>
        <div className="p-4"></div>
      </div>
    </main>
  );
}
