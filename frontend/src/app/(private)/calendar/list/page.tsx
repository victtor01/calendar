"use client";

import Loading from "@/components/loading";
import { convertToRealMoney } from "@/helpers/convertToRealMoney";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types/events";
import { Service } from "@/types/services";
import moment from "moment";

function calculeTotalValueOfEvent(array: Service[]) {
  let price = 0;

  for (const service of array) {
    price += service.price || 0;
  }

  return price;
}

export default function List() {
  const { events, loadingEvents } = useEvents();

  if (loadingEvents) {
    return (
      <div className="flex justify-center items-start w-full h-full">
        <Loading className="bg-cyan-500 m-auto" />
      </div>
    );
  }

  if (!events) {
    return "Nenhum evento!";
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded overflow-hidden">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
            <th> Selecionar </th>
            <th scope="col" className="px-6 py-3">
              Nome do evento
            </th>
            <th scope="col" className="px-6 py-3">
              Criado em
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-zinc-900 text-white border-b border-zinc-800"
            >
              Começa em
            </th>
            <th scope="col" className="px-6 py-3">
              Preço total
            </th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event: Event) => {
            const price = calculeTotalValueOfEvent(event?.services || []);

            return (
              <tr
                key={event.id}
                className="bg-white border-b dark:bg-zinc-900 dark:border-gray-700 even:bg-blue-50 even:dark:bg-neutral-900"
              >
                <th className="p-2">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {event.name}
                </th>
                <td className="px-6 py-4">
                  {moment(event.createdAt).format("DD, MMM [de] YYYY")}
                </td>
                <td className="px-6 py-4 p-2 bg-zinc-950 text-white border-b border-zinc-800">
                  {moment(event.start).format("DD, MMM [de] YYYY [às] HH:mm")}
                </td>
                <td className="px-6 py-4">
                  {convertToRealMoney.format(price)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
