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
  phone?: string;
  street?: string;
  birth?: Date;
  createAt: Date;
  updateAt: Date;
  userId: number;
}

export const useClients = () => {
  const api = useApiPrivate();

  const getClients = () => {
    const get = async (): Promise<Clients[]> => {
      return (await api.get("/clients")).data;
    };

    const { data: clients } = useQuery<Clients[]>({
      queryKey: ["clients"],
      queryFn: get,
    });

    return {
      clients,
    };
  };

  return {
    getClients,
  };
};
