"use client";
import { fontRoboto } from "@/app/fonts";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BsFillPenFill } from "react-icons/bs";

const useAccounts = () => {
  const api = useApiPrivate();

  async function getAccounts() {
    return (await api.get("/accounts")).data;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  return {
    data,
    isLoading,
  };
};

interface AccountProps {
  name: string;
  description: string;
}

const Account = ({ item }: { item: AccountProps }) => {
  return (
    <div className="p-2 flex justify-between items-center bg-slate-100 rounded opacity-70 hover:opacity-100 hover:shadow-lg">
      <div>{item.name}</div>
      <div>
        <button className="p-3 hover:text-blue-400">
          <BsFillPenFill />
        </button>
      </div>
    </div>
  );
};

export default function Accounts() {
  const { data, isLoading } = useAccounts();

  if (isLoading) {
    return "LOADING...";
  }

  return (
    <div className="p-3 mx-auto my-10 w-[100%] max-w-[30rem] flex flex-col gap-2">
      <header className={`${fontRoboto} overflow-auto flex items-center gap-3`}>
        <Link
          href={"/finance"}
          className="text-black bg-sky-200 p-3 px-4 text-lg rounded opacity-70 hover:opacity-100 "
        >
          Voltar
        </Link>
        <Link
          href={"accounts/create"}
          className="text-black bg-sky-200 p-3 px-4 text-lg rounded opacity-70 hover:opacity-100 "
        >
          criar nova conta
        </Link>
      </header>
      <div className="mt-3 flex justify-between text-cyan-500">
        <h2 className="text-2xl">Minhas contas</h2>
        <div className="bg-emerald-200 opacity-50 flex p-2 px-3 rounded text-black">
          {data && data?.length} / 10
        </div>
      </div>
      <div className="opacity-70 text-gray-900 text-lg flex flex-col gap-2">
        {data?.length > 0
          ? data?.map((item: AccountProps, index: number) => (
              <Account key={index} item={item} />
            ))
          : "Nenhum item"}
      </div>
    </div>
  );
}
