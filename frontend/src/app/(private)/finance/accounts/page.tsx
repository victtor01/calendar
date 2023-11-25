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
    <div className="p-2 flex justify-between items-center bg-zinc-400 bg-opacity-5 rounded hover:opacity-100 hover:shadow-lg">
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
    return <Loading />;
  }

  return (
    <S.Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 m-auto shadow rounded w-[100%] max-w-[30rem] flex flex-col gap-2"
    >
      <header
        className={`${fontOpenSans} overflow-auto flex items-center gap-2`}
      >
        <Link
          href={"/finance/"}
          className="bg-cyan-500 flex items-center gap-3 text-white p-2 px-3 rounded opacity-90 hover:opacity-100 "
        >
          <BsArrowLeft size="18" />
          Voltar
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
      <div className="opacity-70 text-lg flex flex-col gap-2">
        {data?.length > 0
          ? data?.map((item: AccountProps, index: number) => (
              <Account key={index} item={item} />
            ))
          : "Nenhum item"}
      </div>
    </S.Container>
  );
}
