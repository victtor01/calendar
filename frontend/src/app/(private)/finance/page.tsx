import { Create } from "./create";
import { fontOpenSans } from "@/app/fonts";

export default function Finance() {
  return (
    <div
      className={`${fontOpenSans} m-auto flex flex-col max-w-[30rem] w-[100%] h-[40rem] overflow-hidden bg-transparent rounded`}
    >
      <header className="w-full flex items-center p-5 px-5 h-15 text-lg bg-cyan-700 text-white rounded">
        Financeiros
      </header>
      <Create />
    </div>
  );
}
