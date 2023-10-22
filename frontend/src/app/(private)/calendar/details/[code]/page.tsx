"use client";
import useApiPrivate from "@/hooks/apiPrivate";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

type CreateEventsFormData = z.infer<typeof createEventsFormSchema>;

interface DetailsProps {
  params: {
    code: string;
  };
}

const labelFormEventsData = [
  { name: "name", span: "Nome" },
  { name: "description", span: "Descrição" },
  { name: "start", span: "Começa em" },
  { name: "end", span: "Termina em" },
];

const createEventsFormSchema = z.object({
  name: z.string().nonempty("Preencha o nome!"),
  allDay: z.string(),
  description: z.string(),
  start: z.string(),
  end: z.string(),
  color: z.string(),
});

const useDetails = (code: string) => {
  const api = useApiPrivate();
  const { data: event } = useQuery({
    queryKey: ["event", code],
    queryFn: async () => {
      return (await api.get(`/events/find/${code}`)).data;
    },
  });
  return {
    event,
  };
};

export default function Details({ params: { code } }: DetailsProps) {
  const { event } = useDetails(code);
  return <>{code}</>;
}
