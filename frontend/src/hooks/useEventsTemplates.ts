import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "./apiPrivate";

export interface EventsTemplates {
  id: number;
  code: string;
  name: string;
  color?: string;
  description: string;
  createAt: string;
  updateAt: string;
  userId: number;
}

export default function useEventsTemplates() {
  const api = useApiPrivate();

  const getAllQuery = async () => {
    const response = (await api.get("/events-templates")).data;
    return response;
  };

  const { data } = useQuery({
    queryKey: ["events-templates"],
    queryFn: getAllQuery,
  });

  function getAll() {
    return {
      data,
    };
  }

  return {
    getAll,
  };
}
