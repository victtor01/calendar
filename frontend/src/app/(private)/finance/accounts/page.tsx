import { fontRoboto } from "@/app/fonts";
import Link from "next/link";

export default function Accounts() {
  return (
    <div className="p-3 mx-auto my-10 w-[100%] max-w-[30rem] flex flex-col gap-2">
      <header
        className={`${fontRoboto} overflow-auto flex items-center gap-3`}
      >
        <Link
          href={"accounts/create"}
          className="bg-sky-200 p-2 px-3 rounded opacity-70 hover:opacity-100 "
        >
          criar nova conta
        </Link>
      </header>
      <div className="opacity-70 text-zinc-800">
        Ainda não há contas criadas!
      </div>
    </div>
  );
}
