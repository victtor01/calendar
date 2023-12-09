import { Clients } from 'src/clients/entities/clients.entity';
import { EventsComments } from 'src/events-comments/entities/events-comments.entity';
import { Service } from 'src/services/entities/service.entity';

export class Events {
  id: number;
  name: string;
  code: string;
  description?: string;
  color?: string;
  start: Date;
  allDay: boolean;
  end: Date;
  status: StatusEvent;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  clients?: Clients[];
  comments?: EventsComments[];
  services?: Service[];
}

export type StatusEvent = 'ACTIVATED' | 'CONCLUDED' | 'FILED';
