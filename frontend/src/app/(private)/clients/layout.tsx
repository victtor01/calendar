'use client'
import Header from "@/components/header";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header.Root className="shadow min-h-auto p-2 flex w-full border-b border-zinc-500 border-opacity-20 items-center justify-between">
        <div className="opacity-60 p-3">Clientes</div>
        <div className="flex gap-2">
          <Link
            className="text-black opacity-80 hover:opacity-100 p-3 bg-sky-200 rounded-md min-w-[4rem] flex justify-center"
            href={"/clients"}
          >
            Meus clientes
          </Link>
          <Link
            className="opacity-80 px-5 hover:opacity-100 p-3 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white rounded-md min-w-[4rem] flex justify-center"
            href={"clients/create"}
          >
            Criar
          </Link>
        </div>
      </Header.Root>
      {children}
    </>
  );
}
