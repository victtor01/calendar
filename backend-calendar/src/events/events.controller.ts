import {
  Controller,
  Request,
  Body,
  Post,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { CreateEventsDto } from './dto/create-events.dto';
import { User } from 'src/users/entities/user.entity';
import { EventsService } from './events.service';
import { UpdateEventsDto } from './dto/update-events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('')
  async findAll(@Request() req: { user: User }) {
    return await this.eventsService.getAll(req.user.id);
  }

  @Get('/find/:param')
  async findOne(@Request() req: { user: User }, @Param('param') identifier: string) {
    return await this.eventsService.findOne({
      userId: req.user.id,
      code: identifier
    })
  }

  @Post('create')
  async create(@Body() data: CreateEventsDto, @Request() req: { user: User }) {
    data.userId = req.user.id;
    return await this.eventsService.create(data);
  }

  @Put('update/:id')
  async update(
    @Body() body: UpdateEventsDto,
    @Param('id') id: number,
    @Request() req: { user: User },
  ) {
    body.id = Number(id);
    return await this.eventsService.update(body);
  }
}
