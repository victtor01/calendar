"use client";

import { fontOpenSans, fontRoboto } from "@/app/fonts";
import Loading from "@/components/loading";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BsArrowLeft, BsFillPenFill } from "react-icons/bs";
import * as S from "./style";
import { IoMdAdd } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";
import { Account } from "@/types/accounts";

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

const Account = ({ item }: { item: Account }) => {
  return (
    <tr className="even:bg-blue-50 border-b dark:bg-zinc-800 even:dark:bg-zinc-900 dark:border-zinc-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.name}
      </th>
      <td className="px-6 py-4">{item?.registers?.length || 0}</td>
      <td className="px-6 py-4">
        <Link
          href={`/finance/accounts/${item.code}`}
          className="p-3 hover:text-blue-400 flex"
        >
          <BsFillPenFill />
        </Link>
      </td>
    </tr>
  );
};

export default function Accounts() {
  const { data, isLoading } = useAccounts();

  return (
    <S.Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 m-auto border dark:border-zinc-800 rounded w-[100%] max-w-[50rem] flex flex-col gap-2"
    >
      <header
        className={`${fontOpenSans} overflow-auto flex items-center justify-between gap-2`}
      >
        <Link
          href={"/finance/"}
          className="bg-blue-50 dark:bg-zinc-800 flex items-center gap-3 p-3 rounded opacity-90 hover:opacity-100 "
        >
          <BsArrowLeft size="18" />
        </Link>
        <Link
          href={"/finance/accounts/create/"}
          className="bg-gradient-45 from-purple-500 to-blue-500 flex items-center gap-3 text-white p-2 px-3  rounded opacity-90 hover:opacity-100 "
        >
          <IoMdAdd />
          Criar nova conta
        </Link>
      </header>
      <div className="mt-3 flex items-center gap-3 justify-between ">
        <FaCreditCard size="20" />
        <h2 className="text-2xl opacity-70">Contas</h2>
        <div className="bg-emerald-200 opacity-70 flex p-2 px-3 rounded text-black">
          {data && data?.length} / 10
        </div>
      </div>
      <div className="opacity-70 text-lg  flex flex-col gap-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Quan. de registros
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0
              ? data?.map((item: Account, index: number) => (
                  <Account key={index} item={item} />
                ))
              : "Nenhum item"}
          </tbody>
        </table>
      </div>
    </S.Container>
  );
}
