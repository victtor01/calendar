import { Clients } from 'src/clients/entities/clients.entity';
import { EventsComments } from 'src/events-comments/entities/events-comments.entity';

export class Events {
  id: number;
  name: string;
  code: string;
  description?: string;
  color?: string;
  start: Date;
  allDay: boolean;
  end: Date;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  clients?: Clients[];
  comments?: EventsComments[];
}

type Status = 'ACTIVATED' | 'CONCLUDED' | 'FILED';
