"use client";

import { fontRoboto } from "@/app/fonts";
import Loading from "@/components/loading";
import useApiPrivate from "@/hooks/apiPrivate";
import { Service } from "@/types/services";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PiSuitcaseSimpleBold } from "react-icons/pi";

interface ServicesProps {
  clientsServices?: Service[];
}

function useServices() {
  const [showAllServices, setShowAllServices] = useState<boolean>(false);

  const api = useApiPrivate();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return (await api.get("/services")).data;
    },
  });

  return {
    data: {
      services,
      isLoading,
    },
    utils: {
      showAllServices,
      setShowAllServices,
    },
  };
}

export default function Services({ clientsServices }: ServicesProps) {
  const {
    data: { services, isLoading },
    utils: { showAllServices, setShowAllServices },
  } = useServices();

  if (isLoading) return <Loading />;

  return (
    <form className="flex flex-col max-w-[30rem] w-full gap-2 mx-auto">
      <header
        className={`rounded justify-between opacity-70 w-full h-10 flex items-center gap-3 ${fontRoboto}`}
      >
        <h1 className="text-xl flex gap-3 items-center">
          <PiSuitcaseSimpleBold size="18" />
          Serviços
        </h1>
        <Button>

        </Button>
      </header>
      <div className="flex flex-col flex-1 p-2">
        {services?.map((service: Service) => {
          return <div>{service.name}</div>;
        })}
      </div>
    </form>
  );
}
