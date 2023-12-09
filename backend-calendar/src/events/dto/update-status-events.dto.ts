import { StatusEvent } from '../entities/events.entity';

export class UpdateStatusEventsDto {
  id: number;
  userId: number;
  status: StatusEvent;
}