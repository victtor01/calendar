import {
  Controller,
  Request,
  Body,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateEventsDto } from './dto/create-events.dto';
import { User } from 'src/users/entities/user.entity';
import { EventsService } from './events.service';
import { UpdateEventsDto } from './dto/update-events.dto';
import { UpdateConnectManyDto } from './dto/update-connect-many.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('')
  async findAll(@Request() req: { user: User }) {
    return await this.eventsService.getAll(req.user.id);
  }

  @Get('/find/week')
  async findWeek(@Request() req: { user: User }) {
    return await this.eventsService.findByWeek(Number(req.user.id));
  }

  @Get('/find/:param')
  async findOne(
    @Request() req: { user: User },
    @Param('param') identifier: string,
  ) {
    return await this.eventsService.findOne({
      userId: req.user.id,
      code: identifier,
    });
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

  @Put('update/connections/:id')
  async updateConnections(
    @Body() data: { connections: number[]; disconnections: number[] },
    @Request() req: { user: User },
    @Param('id') id: number,
  ) {
    console.log(data);
    return await this.eventsService.updateConnections({
      userId: Number(req.user.id),
      eventId: Number(id),
      data,
    });
  }

  @Delete('delete-many')
  async deleteMany(
    @Body() array: { ids: number[] },
    @Request() req: { user: User },
  ) {
    const { ids } = array;
    const userId = Number(req.user.id);
    return await this.eventsService.deleteMany({ ids, userId });
  }
}
