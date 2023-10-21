import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { EventsTemplatesService } from './events-templates.service';
import { eventsTemplates } from './entities/events-templates.entity';
import CreateEventsTemplatesDto from './dto/create-events-templates.dto';

@Controller('events-templates')
export class EventsTemplatesController {
  constructor(
    private readonly eventsTemplatesService: EventsTemplatesService,
  ) {}

  @Get()
  async findAll(@Request() req: any): Promise<eventsTemplates[]> {
    return await this.eventsTemplatesService.findAll(req.user.id);
  }

  @Post('create')
  async create(
    @Body() data: CreateEventsTemplatesDto,
    @Request() req: any,
  ): Promise<eventsTemplates> {
    data.userId = req.user.id;
    return await this.eventsTemplatesService.create(data);
  }
}
