export default function Configurations() {
  return (
    <main className="m-auto w-full flex-col flex gap-5">
      <div className="flex flex-col bg-white dark:bg-zinc-800 shadow-md">
        <header className="flex w-full justify-between bg-indigo-600 text-white">
          <div className="p-3 font-semibold">Configurações da conta.</div>
        </header>
        <div className="p-4"></div>
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
