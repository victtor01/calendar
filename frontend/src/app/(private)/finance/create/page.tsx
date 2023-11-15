import { fontOpenSans, fontRoboto } from "@/app/fonts";
import Link from "next/link";
import { Create } from "./create";
import * as S from "../style";
import { BsArrowLeft } from "react-icons/bs";

export default function CreateRegister() {
  return (
    <S.Container
      className={`${fontOpenSans} m-auto flex flex-col max-w-[35rem] w-[100%] min-h-auto relative shadow p-1 rounded-md`}
    >
      <header
        className={`z-10 flex items-center justify-between rounded-md overflow-hidden`}
      >
        <div className="justify-end flex gap-2 text-white p-2">
          <Link
            href={"/finance"}
            className="p-3 w-[8rem] justify-center flex items-center gap-2 hover:gap-4 transition-[gap] rounded-md opacity-80 hover:opacity-100 bg-cyan-500 "
          >
            <BsArrowLeft size="18"/>
            Registros
          </Link>
        </div>
        <div
          className={
            "justify-end flex gap-2 font-semibold opacity-100 px-2" +
            `  `
          }
        >
          <div className="text-xl opacity-70 p-3">
            <h1>Criar Registro</h1>
          </div>
        </div>
      </header>
      <Create />
    </S.Container>
  );
}
