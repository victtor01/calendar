import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "./apiPrivate";
import { Clients } from "@/types/clients";

export const useClients = () => {
  const api = useApiPrivate();

  const get = async (): Promise<Clients[]> => {
    return (await api.get("/clients")).data;
  };

  const { data: clients } = useQuery<Clients[]>({
    queryKey: ["clients"],
    queryFn: get,
  });

  const getClients = () => {
    return {
      clients,
    };
  };

  return {
    getClients,
  };
};
