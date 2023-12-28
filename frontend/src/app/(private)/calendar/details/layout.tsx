import { Suspense } from "react";
import Skeleton from "./skeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-2 flex m-2 relative rounded-xl gap-6 w-auto min-h-auto z-10 bg-white dark:bg-zinc-900">
      <Suspense fallback={<Skeleton />}>{children}</Suspense>
    </main>
  );
}
