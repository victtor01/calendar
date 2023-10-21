export class UpdateEventsDto {
    id: number;
    name?: string;
    description?: string;
    color?: string;
    allDay?: boolean;
    start?: Date;
    end?: Date;
}