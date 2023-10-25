import { Body, Controller, Post } from '@nestjs/common';
import { CreateEventsCommentsDto } from './dto/create-events-comments.dto';
import { EventsCommentsService } from './events-comments.service';

@Controller('events-comments')
export class EventsCommentsController {
  constructor(private readonly eventsCommentsService: EventsCommentsService) {}

  @Post('create')
  async create(@Body() data: CreateEventsCommentsDto) {
    data.eventId = Number(data.eventId);
    return this.eventsCommentsService.create(data);
  }
}
