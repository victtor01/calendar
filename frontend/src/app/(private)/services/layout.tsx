import Link from "next/link";
import * as S from "./styles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <S.Container className="w-full h-auto flex-1 flex flex-col">
      <S.Header className="p-2 flex min-h-[4rem] items-center justify-between shadow">
        <div className="p-2 opacity-60">Serviços</div>
        <div className="flex items-center gap-3">
          <Link href="/services/create">Criar</Link>
          <Link
            href="/services/create"
            className="bg-cyan-500 text-white p-3 px-4 opacity-70 hover:opacity-100 rounded-md"
          >
            Criar
          </Link>
        </div>
      </S.Header>
      <div className="p-2 flex-1 flex">{children}</div>
    </S.Container>
  );
}
