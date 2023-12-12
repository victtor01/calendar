import Link from "next/link";
import { fontInter } from "./fonts";
import * as S from "./style";

export default function Home() {
  return (
    <main className="h-screen overflow-auto w-full relative">
      <section className="flex flex-1 flex-col gap-2 justify-center h-full items-center">
        <S.Bubble />
        <div className="w-[30rem] flex flex-col gap-7 relative overflow-visible">
          <div className="flex flex-col gap-2">
            <h1 className={`text-4xl font-bold ${fontInter}`}>
              Ops... Esta página ainda está sendo construída.
            </h1>
            <h2 className="text-xl">
              Não se preocupe, estamos trabalhando para te entregar uma boa
              experiência!
            </h2>
          </div>
          <div className="flex gap-4 w-full items-center">
            <Link
              href={"/login"}
              className="bg-gradient-45 from-purple-500 to-cyan-500 text-white p-3 px-4 rounded"
            >
              <span className="text-xl flex items-center">Entre agora!</span>
            </Link>
            <Link
              href="/register"
              className="border p-3 px-4 rounded hover:bg-white hover:text-black"
            >
              <span className="font-semibold">Ou faça o login.</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
