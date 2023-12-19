import { Clients } from "./clients";
import { Service } from "./services";
import { Comment } from './comment';
import { EventsTemplates } from "./eventsTemplates";

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
  comments?: Comment[];
  clients?: Clients[];
  services?: Service[];
  templates?: EventsTemplates[];
  createdAt: Date;
}

export type StatusEvent = "ACTIVATED" | "CONCLUDED" | "FILED";
