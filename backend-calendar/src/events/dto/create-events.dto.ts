export class CreateEventsDto {
  name: string;
  description?: string;
  color?: string;
  allDay: boolean;
  start: Date;
  end: Date;
  userId: number;
}
