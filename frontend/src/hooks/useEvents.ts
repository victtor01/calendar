import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "./apiPrivate";
import { Event } from "@/types/events";

export function useEvents() {
  const api = useApiPrivate();

  const { data: events, isLoading: loadingEvents } = useQuery<
    Event[] | undefined
  >({
    queryKey: ["events"],
    queryFn: async (): Promise<Event[] | undefined> => {
      return (await api.get("/events")).data;
    },
  });

  return {
    loadingEvents,
    events,
  };
}
