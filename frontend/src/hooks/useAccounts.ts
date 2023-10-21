import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "./apiPrivate";

export interface Accounts {
  id: number;
  name: string;
  description: string;
  code: string;
}

export const useAccounts = () => {
  const api = useApiPrivate();

  const get = async (): Promise<Accounts[]> => {
    return (await api.get("/accounts")).data;
  };

  const { data: accounts } = useQuery<Accounts[]>({
    queryKey: ["accounts"],
    queryFn: get,
  });

  const getAccounts = () => {
    return {
      accounts,
    };
  };

  return {
    getAccounts,
  };
};
