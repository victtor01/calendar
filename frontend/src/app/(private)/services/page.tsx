"use client";

import Register from "@/components/register";
import moment from "moment";
import { GoSearch } from "react-icons/go";
import { Service } from "./types";
import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "@/hooks/apiPrivate";
import Loading from "@/components/loading";

function useServices() {
  const api = useApiPrivate();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return (await api.get("/services")).data;
    },
  });

  return {
    query: {
      services,
      isLoading,
    },
  };
}

export default function Services() {
  const {
    query: { services, isLoading },
  } = useServices();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col m-auto max-w-[50rem] w-full p-2 gap-3">
      <div className="flex p-0 items-center justify-between">
        <div></div>
        <div className="flex gap-3 items-center w-auto">
          <input className="focus:shadow rounded-lg w-full outline-none p-1 transition-shadow border-none p-3 bg-zinc-400 bg-opacity-10" />
          <button className="w-[4rem] h-[3rem] rounded-md opacity-70 hover:opacity-80 bg-cyan-400 items-center justify-center flex">
            <GoSearch size="20" className="text-white" />
          </button>
        </div>
      </div>
      {services?.map((item: Service, index: number) => {
        return (
          <Register.Root key={index}>
            <Register.Compartiment>
              <Register.Title>Nome</Register.Title>
              <Register.Content>{item.name}</Register.Content>
            </Register.Compartiment>
            <Register.Compartiment>
              <Register.Title>Descrição</Register.Title>
              <Register.Content>{item?.description || "-"}</Register.Content>
            </Register.Compartiment>
            <Register.Compartiment>
              <Register.Title>preço</Register.Title>
              <Register.Content>{item?.price}</Register.Content>
            </Register.Compartiment>
            <Register.Compartiment>
              <Register.Title>Criado em</Register.Title>
              <Register.Content>
                {moment(item.createdAt).format("YYYY / MM / DD")}{" "}
              </Register.Content>
            </Register.Compartiment>
            <Register.ButtonTrash />
            <Register.ButtonEdit />
          </Register.Root>
        );
      })}
    </div>
  );
}
