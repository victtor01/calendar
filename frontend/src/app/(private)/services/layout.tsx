import { Suspense } from "react";
import * as S from "./styles";
import Loading from "@/components/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <S.Container className="w-full h-auto flex-1 flex flex-col">
      <div className="p-2 flex-1 flex">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </S.Container>
  );
}
