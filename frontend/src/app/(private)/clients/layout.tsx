import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full items-center jusitfy-center flex flex-col gap-2">
      <header className="min-h-auto p-2 flex w-full border-b border-zinc-500 border-opacity-20 items-center justify-between">
        <div className="">Teste</div>
        <div className="flex gap-4">
          <Link
            className="text-black opacity-80 hover:opacity-100 p-3 bg-sky-200 rounded min-w-[4rem] flex justify-center"
            href={"/clients"}
          >
            Clientes
          </Link>
          <Link
            className="opacity-80 hover:opacity-100 p-3 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white rounded min-w-[4rem] flex justify-center"
            href={"clients/create"}
          >
            New
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
