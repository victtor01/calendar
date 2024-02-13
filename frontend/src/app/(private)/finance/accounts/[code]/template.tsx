import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex  w-full p-4 gap-4 border dark:border-zinc-700 flex-col bg-white dark:bg-zinc-900">
      <header className="flex">
        <Link className="flex gap-2 items-center bg-blue-50 dark:bg-zinc-800 p-3 rounded" href={"/finance/accounts/"}>
          <BsArrowLeft />
        </Link>
      </header>
      {children}
    </main>
  );
}
