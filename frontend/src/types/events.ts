import { Clients } from "./clients";
import { Service } from "./services";
import { Comment } from './comment';

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
  createdAt: Date;
}

export type StatusEvent = "ACTIVATED" | "CONCLUDED" | "FILED";
