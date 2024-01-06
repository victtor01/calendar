import { Suspense } from "react";
import * as S from "./styles";
import Loading from "@/components/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-auto flex-1 flex flex-col">
      <div className="p-2 flex-1 flex">
        <Suspense fallback={<Loading className="bg-cyan-400" />}>
          {children}
        </Suspense>
      </div>
    </main>
  );
}
