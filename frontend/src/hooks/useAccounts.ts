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

  const useGetAccounts = () => {
    return useQuery<Accounts[]>({
      queryKey: ['accounts'],
      queryFn: async (): Promise<Accounts[]> => {
        return (await api.get('/accounts')).data;
      },
    });
  };

  const useFindByCode = (code: string) => {
    return useQuery<Accounts>({
      queryKey: ['account', code],
      queryFn: async (): Promise<Accounts> => {
        return (await api.get(`/accounts/find-by-code/${code}`)).data;
      },
    });
  };

  return {
    useGetAccounts,
    useFindByCode,
  };
};