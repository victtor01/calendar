"use client";
import Register from "@/components/register";

export default function Clients() {
  return (
    <div className="w-auto flex min-w-[40rem] flex-col gap-2">
      <div className="text-xl text-cyan-600 mt-5">Todos os meus clientes</div>
      <Register.Root>
        <Register.Compartiment>
          <Register.Title>Teste</Register.Title>
          <Register.Content>Teste</Register.Content>
        </Register.Compartiment>
        <Register.Compartiment>
          <Register.Title>Teste</Register.Title>
          <Register.Content>Teste</Register.Content>
        </Register.Compartiment>
        <Register.Compartiment className="flex-none flex-row">
          <Register.ButtonTrash />
          <Register.ButtonEdit />
        </Register.Compartiment>
      </Register.Root>
    </div>
  );
}
