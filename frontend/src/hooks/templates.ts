import { EventsTemplates } from "@/types/eventsTemplates";
import apiPrivate from "./api";
import { useQuery } from "@tanstack/react-query";

interface GetAllProps {
  templates: EventsTemplates[] | undefined;
  isLoading: boolean;
}

export default function useTemplates() {
  const useGetAll = () => {
    return useQuery({
      queryKey: ["templates"],
      queryFn: async (): Promise<EventsTemplates[] | undefined> => {
        return (await apiPrivate.get("/events-templates/")).data;
      },
    });
  };

  return {
    useGetAll,
  };
}

