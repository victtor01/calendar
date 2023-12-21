import { Suspense } from "react";
import Skeleton from "./skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-2 flex w-full gap-6 w-full h-full overflow-auto fixed top-0 left-0 z-[100] bg-white dark:bg-zinc-900">
      <Suspense fallback={<Skeleton />}>{children}</Suspense>
    </main>
  );
}
