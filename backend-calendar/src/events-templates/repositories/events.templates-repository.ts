import CreateEventsTemplatesDto from "../dto/create-events-templates.dto";
import { eventsTemplates } from "../entities/events-templates.entity";

export abstract class EventsTemplatesRepository {
    abstract create(data: CreateEventsTemplatesDto): Promise<eventsTemplates>
    abstract findAll(userId: number): Promise<eventsTemplates[]>
}