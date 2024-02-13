import { Event } from "@/types/events";
import { Delete } from "./delete";
import Finish from "./finish";

interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  if (!event?.id) {
    return (
      <div className="text-xl font-semibold">
        Nenhum evento, tente novamente mais tarde!
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-center justify-end z-[2000]">
      <Delete event={event} />
      <Finish event={event} />
    </div>
  );
}
