import { Injectable } from '@nestjs/common';
import { EventsCommentsRepository } from './repositories/events-comments-repository';
import { CreateEventsCommentsDto } from './dto/create-events-comments.dto';
import { EventsComments } from './entities/events-comments.entity';

@Injectable()
export class EventsCommentsService {
  constructor(
    private readonly eventsCommentsRepository: EventsCommentsRepository,
  ) {}

  async create(data: CreateEventsCommentsDto): Promise<EventsComments> {
    return await this.eventsCommentsRepository.create(data);
  }
}
