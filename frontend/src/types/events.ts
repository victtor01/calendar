import { Clients } from "./clients";
import { Service } from "./services";

export interface Event {
  id: number;
  name: string;
  code: string;
  end: Date | string;
  start: Date | string;
  status: Status;
  description?: string;
  allDay?: boolean;
  color?: string;
  comments?: CommentsEvents[];
  clients?: Clients[];
  services?: Service[];
}

interface CommentsEvents {
  id: number;
  content: string;
  eventId: number;
}

type Status = "ACTIVATED" | "CONCLUDED" | "FILED";
