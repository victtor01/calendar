import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "./apiPrivate";

export interface Clients {
  id: number;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf?: string;
  cep?: string;
  color?: string;
  phone?: string;
  street?: string;
  birth?: Date;
  createAt: Date;
  updateAt: Date;
  userId: number;
}

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
