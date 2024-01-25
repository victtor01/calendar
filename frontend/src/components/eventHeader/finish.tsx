import useApiPrivate from "@/hooks/apiPrivate";
import { queryClient } from "@/hooks/queryClient";
import { Event, StatusEvent } from "@/types/events";
import { useState } from "react";
import { motion } from "framer-motion";
import { fontInter } from "@/app/fonts";
import Label from "../label";
import { IoClose } from "react-icons/io5";
import Modal from "../modal";
import * as S from "./style";
import { Clients } from "@/types/clients";
import { Service } from "@/types/services";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Account } from "@/types/accounts";
import { toast } from "react-toastify";

function useFinish({ event }: { event: Event }) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const [showModalFinish, setShowModalFinish] = useState<boolean>(false);
  const handleShowModalFinish = () => setShowModalFinish((prev) => !prev);

  const api = useApiPrivate();

  async function finishEvent() {
    if (!event) return;

    if (!selectedAccount) {
      toast.error("Selecione uma conta!");
      return;
    }

    const status: StatusEvent = "CONCLUDED";

    await api.patch(`/events/update-status/${event.id}`, {
      status,
    });

    const { services } = event;

    if (services?.length) {
      const allPriceEventsService = services
        .map((service: Service) => service.price)
        .reduce((acc: number, price: number) => {
          return price + acc;
        });

      await api.post("/registers/create/", {
        name: `Entrada do evento "${event.name}"`,
        value: allPriceEventsService,
        description: "",
        type: "INCOME",
        accountId: selectedAccount.id,
      });
    }

    queryClient.invalidateQueries(["event", event.code]);

    queryClient.invalidateQueries(["events"]);

    setShowModalFinish(false);
  }

  const { data: accounts, isLoading: loadingAccounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      return (await api.get("/accounts/")).data;
    },
  });

  return {
    finish: {
      handleShowModalFinish,
      showModalFinish,
      finishEvent,
    },
    accounts: {
      accounts,
      loadingAccounts,
    },
    selectedAccount: {
      setSelectedAccount,
      selectedAccount,
    },
  };
}

export default function Finish({ event }: { event: Event }) {
  const {
    finish: { handleShowModalFinish, showModalFinish, finishEvent },
    accounts: { accounts, loadingAccounts },
    selectedAccount: { setSelectedAccount, selectedAccount },
  } = useFinish({ event });

  return (
    <>
      <motion.button
        onClick={handleShowModalFinish}
        className="opacity-90 hover:opacity-100 rounded p-3 items-center font-bold bg-gradient-45 from-purple-500 to-blue-500 text-white"
      >
        Finalizar Evento
      </motion.button>

      {showModalFinish && event && (
        <Modal className="z-[100] max-w-[30rem] ">
          <S.Bubble />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex p-3 rounded-md absolute z-[10] top-0 right-0 translate-x-[50%] translate-y-[-50%]"
          >
            <button
              className="bg-gradient-45 from-purple-500 opacity-90 hover:opacity-100 shadow-lg to-emerald-500 p-2 rounded-full flex w-auto"
              onClick={handleShowModalFinish}
            >
              <IoClose size="24" />
            </button>
          </motion.div>
          <div className="flex flex-col gap-7 ">
            <header className="flex items-center gap-2 bg-zinc-400 bg-opacity-10 p-4">
              <h1 className={`${fontInter} font-semibold`}>Finalizar Evento</h1>
            </header>
            <section className="flex w-full flex-wrap gap-3">
              <Label.Root className="my-0 gap-0 w-auto flex-1 min-w-[10rem]">
                <span className={`${fontInter} text-sm`}>Nome</span>
                <p className="font-semibold opacity-90 text-lg">
                  {event?.name}
                </p>
              </Label.Root>
              <Label.Root className="my-0 gap-0 w-auto min-w-[10rem]">
                <span className={`${fontInter} text-sm`}>Descrição</span>
                <p className="font-semibold opacity-90 text-lg">
                  {event?.description}
                </p>
              </Label.Root>
            </section>
            <span className="w-full bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-800 to-transparent  h-[1px]" />
            <section className="flex flex-col gap-2">
              <header className="flex justify-between gap-2 items-center">
                <h2 className={`${fontInter}`}>Clientes do Evento</h2>
                <div className="opacity-80 text-xs bg-gradient-45 from-purple-500 to-cyan-500 px-2 rounded p-1 text-white">
                  {event?.clients?.length || "0"} Clientes
                </div>
              </header>
              {event?.clients?.map((item: Clients) => {
                return (
                  <div
                    key={item.code}
                    className={`flex text-md bg-zinc-400 bg-opacity-10 p-2 justify-between opacity-90 ${fontInter}`}
                  >
                    <div>{item.firstName}</div>
                    <div>{item?.email}</div>
                  </div>
                );
              })}
              {!event?.clients?.length && (
                <span className="flex font-semibold bg-zinc-100 p-2  text-gray-700 rounded dark:bg-zinc-800 dark:text-gray-400">
                  Nenhum Cliente
                </span>
              )}
            </section>
            <section className="flex flex-col gap-2">
              <header className="flex justify-between gap-2 items-center">
                <h2 className={`${fontInter}`}>Serviços do Evento</h2>
                <div className="opacity-80 text-xs bg-gradient-45 from-purple-500 to-cyan-500 px-2 rounded p-1 text-white">
                  {event?.services?.length || "0"} Serviços
                </div>
              </header>
              {event?.services?.map((service: Service) => {
                return (
                  <div
                    key={service.id}
                    className={`flex text-md bg-zinc-400 bg-opacity-10 p-2 justify-between opacity-90 ${fontInter}`}
                  >
                    <div>{service.name}</div>
                    <div>{convertToRealMoney.format(service?.price)}</div>
                  </div>
                );
              })}
              {!event?.services?.length && (
                <span className="flex font-semibold bg-zinc-100 p-2  text-gray-700 rounded dark:bg-zinc-800 dark:text-gray-400">
                  Nenhum Serviço
                </span>
              )}
            </section>
            <span className="w-full bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-800 to-transparent  h-[1px]" />
            <section className="flex flex-col gap-3">
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Selecione a conta:
              </span>
              <div className="flex gap-3 flex-wrap">
                {accounts?.map((account: Account) => {
                  const selected =
                    selectedAccount?.id.toString() === account.id.toString();
                  const selectedClass = selected
                    ? "bg-purple-600 text-white"
                    : "dark:bg-zinc-800 bg-zinc-100";
                  return (
                    <button
                      key={account.id}
                      onClick={() => setSelectedAccount(account)}
                      className={`p-3 rounded font-semibold ${selectedClass}`}
                    >
                      {account.name}
                    </button>
                  );
                })}
              </div>
            </section>
            <footer className="flex items-center gap-2">
              <input
                className="flex-1 flex p-3 bg-zinc-400 bg-opacity-10 rounded focus:shadow-xl transition-shadow outline-none"
                placeholder="Digite o nome do evento para confirmar"
                required
              />
              <Button
                onClick={finishEvent}
                className="whitespace-nowrap p-3 bg-gradient-45 from-purple-600 to-blue-600 text-white font-semibold px-5 rounded opacity-80 hover:opacity-100"
              >
                terminar evento
              </Button>
            </footer>
          </div>
        </Modal>
      )}
    </>
  );
}
