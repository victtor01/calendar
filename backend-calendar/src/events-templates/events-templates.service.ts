import { Injectable } from '@nestjs/common';
import { EventsTemplatesRepository } from './repositories/events.templates-repository';
import CreateEventsTemplatesDto from './dto/create-events-templates.dto';
import { eventsTemplates } from './entities/events-templates.entity';

@Injectable()
export class EventsTemplatesService {
  constructor(
    private readonly eventsTemplatesRepository: EventsTemplatesRepository,
  ) {}

  async findAll(userId: number): Promise<eventsTemplates[]> {
    return await this.eventsTemplatesRepository.findAll(Number(userId));
  }

  async create(data: CreateEventsTemplatesDto): Promise<eventsTemplates> {
    return await this.eventsTemplatesRepository.create(data);
  }
}
