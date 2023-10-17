import { Create } from "./create";
import { fontOpenSans } from "@/app/fonts";

export default function Finance() {
  return (
    <div
      className={`${fontOpenSans} m-auto flex flex-col max-w-[30rem] w-[100%] min-h-auto relative bg-transparent rounded`}
    >
      <header className="p-2 text-3xl text-cyan-600 opacity-100">
        <h1>Criar uma novo registro</h1>
      </header>
      <Create />
    </div>
  )
}
