import { Clients } from './clients';
export interface Event {
  id: number;
  name: string;
  code: string;
  end: Date | string;
  start: Date | string;
  status?: Status;
  allDay?: boolean;
  color?: string;
  comments?: CommentsEvents[];
  clients?: Clients[];
}

interface CommentsEvents {
  id: number;
  content: string;
  eventId: number;
}

type Status = "ACTIVATED" | "CONCLUDED" | "FILED";
