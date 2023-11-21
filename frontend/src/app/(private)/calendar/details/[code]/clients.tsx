"use client";

import { fontRoboto } from "@/app/fonts";
import Input from "@/components/input/input";
import Loading from "@/components/loading";
import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { Clients } from "@/types/clients";
import { Event } from "@/types/events";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";

function useClients(event: Event) {
  const api = useApiPrivate();

  const [showAllClients, setShowAllClients] = useState<boolean>(false);

  const handleAllClients = () => setShowAllClients((prev) => !prev);

  const { data: allClients, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return (await api.get("/clients")).data;
    },
  });

  const clients = showAllClients
    ? allClients
    : event?.clients
    ? event?.clients
    : [];

  async function handleAddNewClient(id: number) {
    const clientsSelecteds = event?.clients?.map(
      (client: Clients) => client.id
    );

    if (!clientsSelecteds) {
      return;
    }

    if (clientsSelecteds.includes(id)) {
      await api.put(`/events/update/connections/${event.id}`, {
        disconnections: [id],
      });
      queryClient.invalidateQueries(["event", event.code]);
      return;
    }

    await api.put(`/events/update/connections/${event.id}`, {
      connections: [id],
    });

    queryClient.invalidateQueries(["event", event.code]);
  }

  return {
    handleAddNewClient,
    handleAllClients,
    isLoadingClients,
    showAllClients,
    clients,
  };
}

export default function Clients({ event }: { event: Event }) {
  const {
    handleAddNewClient,
    handleAllClients,
    isLoadingClients,
    showAllClients,
    clients,
  } = useClients(event);

  if (isLoadingClients) {
    return <Loading />;
  }

  return (
    <form className="flex flex-col max-w-[25rem] gap-0 min-w-[20rem] w-full gap-2 justify-center  mx-auto items-center ">
      <div
        className={`rounded opacity-70 w-full h-10 flex items-center gap-3 ${fontRoboto}`}
      >
        <BsFillPeopleFill size="18" />
        <h1 className="text-xl">Clientes</h1>
      </div>
      <div className="flex flex-1 w-full gap-5 flex-col rounded">
        <div className="p-0 w-full flex items-center gap-1">
          <Input
            placeholder="Cliente de exemplo"
            className="w-full p-3 rounded border border-zinc-500 border-opacity-20 bg-white bg-opacity-50 outline-none"
          />
          <Button
            type="button"
            className="w-14 flex items-center justify-center h-12 bg-cyan-500 rounded text-white "
          >
            <AiOutlineSearch size="20" />
          </Button>
        </div>
        <div className="w-full flex gap-3">
          <Button
            onClick={handleAllClients}
            type="button"
            className="p-3 bg-cyan-500 rounded text-white"
          >
            {showAllClients ? "Todos os clientes" : "Somente os selecionados"}
          </Button>
        </div>
        <div className="flex gap-1 flex-col w-full flex-1 max-h-[30rem] overflow-auto">
          {clients?.map((client: Clients) => {
            const selected: boolean | undefined = event?.clients?.some(
              (cli: Clients) => cli.id === client.id
            );
            const classSelected = selected ? "bg-rose-500" : "bg-cyan-500";
            return (
              <div
                key={client.id}
                className="flex gap-1 items-center opacity-90 hover:opacity-100"
              >
                <div className="w-full flex justify-between p-2 bg-gray-400 bg-opacity-10 items-center border-b border-zinc-500 border-opacity-30">
                  <div>{client.firstName}</div>
                  <Button
                    type="button"
                    className={`rounded text-white transition-background ${classSelected}`}
                    onClick={() => handleAddNewClient(client.id)}
                  >
                    {selected ? "Remover" : "Selecionar"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}
