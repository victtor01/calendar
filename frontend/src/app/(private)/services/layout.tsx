import Link from "next/link";
import * as S from "./styles";
import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <S.Container className="w-full h-auto flex-1 flex flex-col">
      <div className="p-2 flex-1 flex">{children}</div>
    </S.Container>
  );
}
