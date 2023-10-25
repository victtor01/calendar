import { CreateEventsCommentsDto } from "../dto/create-events-comments.dto";
import { EventsComments } from "../entities/events-comments.entity";

export abstract class EventsCommentsRepository {
    abstract create(data: CreateEventsCommentsDto): Promise<EventsComments>
}