"use client";

import Input from "@/components/input/input";
import Register from "@/components/register";
import moment from "moment";
import { GoSearch } from "react-icons/go";

interface Service {
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
}

function useServices() {
  const data: Service[] = [
    {
      name: "Teste 1",
      description: "Descrição 1",
      price: 20.0,
      createdAt: new Date(),
    },
    {
      name: "Teste 2",
      description: "Descrição 2",
      price: 30.5,
      createdAt: new Date(),
    },
    {
      name: "Teste 3",
      description: "Descrição 3",
      price: 15.99,
      createdAt: new Date(),
    },
    {
      name: "Teste 4",
      description: "Descrição 4",
      price: 45.75,
      createdAt: new Date(),
    },
    {
      name: "Teste 5",
      description: "Descrição 5",
      price: 10.25,
      createdAt: new Date(),
    },
    {
      name: "Teste 6",
      description: "Descrição 6",
      price: 18.75,
      createdAt: new Date(),
    },
    {
      name: "Teste 7",
      description: "Descrição 7",
      price: 22.0,
      createdAt: new Date(),
    },
    {
      name: "Teste 8",
      description: "Descrição 8",
      price: 27.99,
      createdAt: new Date(),
    },
    {
      name: "Teste 9",
      description: "Descrição 9",
      price: 13.45,
      createdAt: new Date(),
    },
    {
      name: "Teste 10",
      description: "Descrição 10",
      price: 36.0,
      createdAt: new Date(),
    },
  ];

  return {
    data,
  };
}

export default function Services() {
  const { data } = useServices();

  return (
    <div className="flex flex-col m-auto max-w-[50rem] w-full p-2 gap-3">
      <div className="flex p-0 items-center justify-between">
        <div></div>
        <div className="flex gap-3 items-center w-auto">
          <input className="focus:shadow rounded-lg outline-none p-1 transition-shadow border-none p-3 bg-zinc-400 bg-opacity-10"/>
          <button className="w-12 h-12 rounded-md opacity-70 hover:opacity-80 bg-cyan-400 items-center justify-center flex">
            <GoSearch size="20" className="text-white"/>
          </button>
        </div>
      </div>
      {data?.map((item: Service, index: number) => {
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
                {moment(item.createdAt).format("YYYY - MM - DD")}{" "}
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
