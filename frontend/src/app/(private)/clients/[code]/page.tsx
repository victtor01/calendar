"use client";

import EventsClients from "./client-events";
import Create from "./client-form";
import * as S from "../style";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { Clients } from "@/types/clients";
import Loading from "@/components/loading";
import Empty from "@/components/empty";
import React from "react";
import ClientDashboard from "./client-dashboard";

interface ClientInfoProps {
  params: {
    code: string;
  };
}

function useClientInfo(code: string) {
  const api = useApiPrivate();

  const { data: client, isLoading: loadingClient } = useQuery({
    queryKey: ["client", code],
    queryFn: async (): Promise<Clients> => {
      return (await api.get(`/clients/find-by-code/${code}`)).data;
    },
  });

  return {
    data: {
      client,
    },
    loading: {
      loadingClient,
    },
  };
}

export default function ClientInfos({ params: { code } }: ClientInfoProps) {
  const {
    data: { client },
    loading: { loadingClient },
  } = useClientInfo(code);

  if (loadingClient) return <Loading className="bg-cyan-500" />;
  if (!client) return <Empty />;

  return (
    <div className="h-auto w-full justify-between flex py-3 gap-5">
      <div className="flex max-w-[30rem] w-full">
        <S.Component className="w-full flex mx-auto rounded-xl">
          <Create client={client} />
        </S.Component>
      </div>
      <div className="flex flex-1 flex-col  max-w-[60rem]">
        <div className="p-3 w-full h-auto rounded-xl">
          <EventsClients client={client} />
        </div>
      </div>
      <div className="flex flex-1 flex-col  max-w-[60rem]">
        <div className="p-3 w-full h-auto rounded-xl">
          <ClientDashboard />
        </div>
      </div>
    </div>
  );
}
