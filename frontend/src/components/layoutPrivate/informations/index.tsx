import { fontRoboto } from "@/app/fonts";
import { Server } from "@/constants/server";
import { useSessionContext } from "@/contexts/sessionContext";
import Image from "next/image";
import { GoGear } from "react-icons/go";
import { IoAdd, IoArrowBackSharp, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Clients } from "@/types/clients";
import useApiPrivate from "@/hooks/apiPrivate";
import moment from "moment-timezone";
import { Register } from "@/types/registers";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import { BiArrowToLeft } from "react-icons/bi";
import { useAtom } from "jotai";
import { informationOpenState } from "@/states/private-layout-state";

const tops = [
  "bg-gradient-45 from-indigo-500 to-purple-600 text-transparent bg-clip-text", // 0
  "bg-gradient-45 from-amber-500 to-yellow-600 text-transparent bg-clip-text",
];

const useTopClients = () => {
  const api = useApiPrivate();

  const { data: clients, isLoading: loadingClients } = useQuery({
    queryKey: ["clients", "top-10-clients"],
    queryFn: async (): Promise<Clients[]> => {
      return (await api.get(`/clients/top-10-clients`)).data;
    },
  });

  return {
    clients,
  };
};

const useIncome = () => {
  const api = useApiPrivate();

  const start = moment().subtract(30, "days").format("MM-DD-YYYY");
  const end = moment().format("MM-DD-YYYY");

  const { data: registers } = useQuery({
    queryKey: ["registers", "thirtyDaysAgo"],
    queryFn: async (): Promise<Register[]> => {
      return (await api.get(`/registers/find/date/${start}/${end}`)).data;
    },
  });

  const incomes: Register[] | undefined = registers?.filter(
    (register) => register.type === "INCOME"
  );

  const incomesToDay =
    incomes
      ?.filter((register) => {
        return (
          moment(register.createdAt).format("DD-MM-YYYY") ===
          moment().format("DD-MM-YYYY")
        );
      })
      ?.map((register) => register.value)
      .reduce((acc, value) => {
        return acc + value;
      }, 0) || 0;

  return { incomes, incomesToDay };
};

export default function Information() {
  const { userInfo } = useSessionContext();
  const { incomes, incomesToDay } = useIncome();
  const { clients } = useTopClients();

  const [informationOpen, setInformationOpen] = useAtom(informationOpenState);

  if (!informationOpen) {
    return (
      <div
        style={{ gridArea: "user" }}
        className="w-[2rem] shadow h-auto rounded bg-white m-2 dark:bg-zinc-900 dark:border-zinc-700 relative"
      >
        <button
          onClick={() => setInformationOpen((prev) => !prev)}
          className="absolute bg-zinc-800 dark:bg-zinc-950 border border-transparent dark:border-zinc-700 opacity-90 hover:opacity-100 text-white top-[3%] translate-x-[-50%] p-4 rounded-full"
        >
          <IoArrowBackSharp />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{ gridArea: "user" }}
      className="bg-transparent flex h-auto m-2 rounded-md shadow-md dark:shadow-black overflow-auto dark:bg-zinc-950 flex-col gap-1 w-[18rem] z-10 bg-white "
    >
      <div className="flex flex-col gap-2 p-3">
        <header className="flex justify-between gap-20">
          <div className="bg-gradient-45 border-1 border-zinc-600 shadow-inner from-purple-600 to-blue-600 w-14 h-14 relative rounded-3xl overflow-hidden opacity-90">
            <Image
              src={`${Server}/uploads/${userInfo.photo}`}
              sizes="(max-width: 2rem) 2rem, 1200px"
              fill
              quality={100}
              style={{ objectFit: "cover" }}
              alt="Foto do usuario"
            />
          </div>
          <div className="flex gap-2 py-1">
            <Link
              href={"/configurations"}
              className="w-8 h-8 items-center justify-center hover:bg-zinc-100 hover:dark:bg-zinc-800 rounded-md flex"
            >
              <GoGear size="20" />
            </Link>
            <button
              onClick={() => setInformationOpen((prev) => !prev)}
              className="w-8 h-8 items-center justify-center hover:bg-zinc-100 hover:dark:bg-zinc-800 rounded-md flex"
            >
              <IoClose size="20" />
            </button>
          </div>
        </header>
        <section
          className={`flex flex-col text-gray-600 font-semibold dark:text-white gap-[-2rem] ${fontRoboto}`}
        >
          <h1 className="text-xl">{userInfo?.firstName}</h1>
          <p>{userInfo?.email}</p>
        </section>
      </div>

      <span className="w-full h-[1px] bg-gray-300 dark:bg-zinc-800" />

      <section className="gap-0 flex-col rounded flex text-gray-800 dark:text-gray-300 p-3">
        <h2 className="text-md font-semibold text-gray-700 dark:text-zinc-300 px-2">
          Rendimentos hoje.
        </h2>
        <div className="flex flex-col relative gap-3 overflow-hidden w-full h-[10rem] bg-gradient-45 from-neutral-950 border dark:border-zinc-800 to-zinc-950 rounded-xl hover:shadow-xl">
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={incomes}
              margin={{ top: 20, bottom: 20 }}
            >
              <Line
                type="monotone"
                dot={false}
                dataKey="value"
                stroke="#4F46E5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="absolute bottom-0 p-3 h-full flex items-end w-full ">
            <span className="text-xl font-semibold text-zinc-200">
              {convertToRealMoney.format(Number(incomesToDay))} Hoje
            </span>
          </div>
        </div>
      </section>

      <span className="w-full h-[1px] bg-gray-300 dark:bg-zinc-800" />

      <section className="flex flex-col h-auto p-3 gap-1">
        <header className="w-full items-center flex justify-between">
          <h2 className="text-md font-semibold text-gray-700 dark:text-zinc-300 ">
            Top clientes.
          </h2>
          <Link
            href={"/clients/create/"}
            className="flex p-2 rounded-md border-none bg-zinc-100 dark:bg-zinc-900"
          >
            <IoAdd />
          </Link>
        </header>
        <div className="flex flex-col h-auto max-h-[15rem] overflow-auto p-2 bg-white dark:shadow-black dark:bg-transparent rounded-lg gap-3 shadow-inner shadow-zinc-200 scroll-none">
          {clients?.map((client, index: number) => {
            const className: string =
              tops[index] || "text-gray-600 dark:text-gray-50";
            return (
              <Link
                href={`/clients/${client.code}`}
                className="grid grid-cols-5 py-1 items-center hover:bg-zinc-100 hover:dark:bg-zinc-900 rounded"
                key={index}
              >
                <div className={`font-semibold w-auto  flex`}>
                  <span
                    className={`${className} px-4 flex items-center justify-center rounded-full`}
                  >
                    {index + 1}.
                  </span>
                </div>
                <div className="w-8 h-8 col-start-2 relative flex-1 rounded-full overflow-hidden bg-gradient-45 from-zinc-800 to-zinc-900">
                  {client?.photo && (
                    <Image
                      src={`${Server}/uploads/clients/${client.photo}`}
                      sizes="(max-width: 2rem) 2rem, 1200px"
                      style={{ objectFit: "cover" }}
                      alt="Foto do usuario"
                      quality={100}
                      fill
                    />
                  )}
                </div>
                <div className="capitalize font-semibold">
                  {client?.firstName?.split(" ")?.[0]}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
