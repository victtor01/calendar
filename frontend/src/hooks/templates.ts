import { EventsTemplates } from "@/types/eventsTemplates";
import apiPrivate from "./api";
import { useQuery } from "@tanstack/react-query";

interface getAllProps {
  templates: EventsTemplates[] | undefined;
  isLoading: boolean;
}

export default class Templates {
  static getAll(): getAllProps {
    const { data: templates, isLoading } = useQuery({
      queryKey: ["templates"],
      queryFn: async (): Promise<EventsTemplates[] | undefined> => {
        return (await apiPrivate.get("/events-templates/")).data;
      },
    });

    return {
      templates,
      isLoading,
    };
  }
}
