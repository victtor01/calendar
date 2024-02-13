import { fontOpenSans } from "@/app/fonts";
import { Create } from "./create-form";

export default function CreateRegister() {
  return (
    <div
      className={`${fontOpenSans} flex flex-col border w-[100%] bg-white dark:bg-zinc-950 min-h-auto relative dark:border-zinc-800 p-1`}
    >
      <header
        className={`z-10 flex items-center justify-between rounded-md overflow-hidden`}
      >
        <div
          className={
            "justify-end flex gap-2 font-semibold opacity-100 px-2" + `  `
          }
        >
          <div className="text-xl opacity-70 p-3">
            <h1>Criar Registro</h1>
          </div>
        </div>
      </header>
      <Create />
    </div>
  );
}
