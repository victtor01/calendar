import { eventsTemplates } from '@prisma/client';

export class UpdateEventsDto {
  id: number;
  name?: string;
  description?: string;
  color?: string;
  allDay?: boolean;
  status?: Status;
  start?: Date;
  end?: Date;

  templates: eventsTemplates[];
}

type Status = 'ACTIVATED' | 'CONCLUDED' | 'FILED';
