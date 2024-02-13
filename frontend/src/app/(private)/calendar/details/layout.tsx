import { Suspense } from "react";
import Skeleton from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-2 flex relative gap-6 w-auto min-h-auto z-10 bg-white dark:bg-zinc-950 border dark:border-zinc-800">
      {children}
    </main>
  );
}
