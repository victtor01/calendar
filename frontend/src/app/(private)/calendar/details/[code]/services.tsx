"use client";

import { fontOpenSans, fontRoboto, fontValela } from "@/app/fonts";
import Loading from "@/components/loading";
import useApiPrivate from "@/hooks/apiPrivate";
import { Service } from "@/types/services";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import { Event } from "@/types/events";
import { queryClient } from "@/hooks/queryClient";
import Input from "@/components/input/input";
import { AiOutlineSearch } from "react-icons/ai";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";

function useServices(event: Event) {
  const [showAllServices, setShowAllServices] = useState<boolean>(true);

  const api = useApiPrivate();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return (await api.get("/services")).data;
    },
  });

  async function addService(serviceId: number) {
    /* Depois fazer uma notificação */
    await api.put(`/events/connect-services/${event.id}`, {
      serviceId,
    });

    queryClient.refetchQueries(["event", event.code]);
  }

  const totalPrice = event?.services?.reduce(
    (acc: number, service: Service) => {
      return acc + service.price;
    },
    0
  );

  return {
    data: {
      services,
      isLoading,
    },
    utils: {
      showAllServices,
      setShowAllServices,
      totalPrice,
    },
    requests: {
      addService,
    },
  };
}

export default function Services({ event }: { event: Event }) {
  const {
    data: { services: allServices, isLoading },
    utils: { showAllServices, setShowAllServices, totalPrice },
    requests: { addService },
  } = useServices(event);

  if (isLoading) return <Loading />;

  const services =
    (showAllServices ? allServices : event?.services) || "Sem serviços";

  return (
    <form className="flex flex-col max-w-[30rem] w-full gap-2 mx-auto">
      <header
        className={`rounded justify-between w-full h-10 flex items-center gap-3 ${fontRoboto}`}
      >
        <h1 className="text-xl flex gap-3 items-center opacity-70">
          <PiSuitcaseSimpleBold size="18" />
          Serviços
        </h1>
        <Button
          onClick={() => setShowAllServices((prev) => !prev)}
          className={`text-white bg-cyan-500 rounded transition-background`}
        >
          {showAllServices ? "Mostrar todos" : "Serviços prestados"}
        </Button>
      </header>
      <div className="p-0 w-full flex items-center gap-1">
        <Input
          placeholder="Pesquise por serviço..."
          className="w-full p-0 rounded border border-zinc-500 border-opacity-20 bg-white bg-opacity-50 outline-none"
        />
        <button
          type="button"
          className="w-14 flex items-center justify-center h-12 bg-cyan-500 rounded text-white "
        >
          <AiOutlineSearch size="20" />
        </button>
      </div>
      <div className="flex">
        <span className="flex p-2 bg-emerald-400 bg-opacity-80 text-white">
          {convertToRealMoney.format(totalPrice || 0)}
        </span>
      </div>
      <div className={`flex flex-col flex-1 gap-1 ${fontRoboto}`}>
        <AnimatePresence mode="popLayout">
          {services?.map((service: Service, index: number) => {
            const selected = event?.services
              ?.map((item) => item.id)
              .includes(service.id);
            return (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={service.id.toString()}
                className="p-2 px-3 bg-zinc-400 relative opacity-90 bg-opacity-5 flex items-center justify-between"
              >
                <div className="flex flex-[1]">{service.name}</div>
                <div className="flex flex-[2]">
                  {moment(service.createdAt).format("ddd, DD / MM / YYYY")}
                </div>
                <div className="flex flex-[1]">
                  {convertToRealMoney.format(service.price)}
                </div>
                <Button
                  onClick={() => addService(service.id)}
                  className={`rounded text-white opacity-40 hover:opacity-90
                    ${selected ? "bg-rose-500" : "bg-cyan-500"}
                    `}
                >
                  {selected ? "Remover" : "Selecionar"}
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </form>
  );
}
