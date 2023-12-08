import { Clients } from "./clients";
import { Service } from "./services";

export interface Event {
  id: number;
  name: string;
  code: string;
  end: Date | string;
  start: Date | string;
  status: StatusEvent;
  description?: string;
  allDay?: boolean;
  color?: string;
  comments?: CommentsEvents[];
  clients?: Clients[];
  services?: Service[];
  createdAt: Date;
}

interface CommentsEvents {
  id: number;
  content: string;
  eventId: number;
}

export type StatusEvent = "ACTIVATED" | "CONCLUDED" | "FILED";
