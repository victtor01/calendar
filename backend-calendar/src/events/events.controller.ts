import {
  Controller,
  Request,
  Body,
  Post,
  Get,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateEventsDto } from './dto/create-events.dto';
import { User } from 'src/users/entities/user.entity';
import { EventsService } from './events.service';
import { UpdateEventsDto } from './dto/update-events.dto';
import { UpdateConnectManyDto } from './dto/update-connect-many.dto';

/* 
 / => Pegar todos
 /find/week => Pegar os registros da semana
 /find/:param => Pegar por código
 /create => Criar Novo registro
 /update/:id => Atualizar Registro
*/

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

  @HttpCode(HttpStatus.OK)
  @Post('find-by-date')
  async findByDate(
    @Body() data: { start: string; end: string },
    @Request() req: { user: User },
  ) {
    return await this.eventsService.findByDate({
      userId: +req.user.id,
      start: new Date(data.start),
      end: new Date(data.end),
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
    return await this.eventsService.updateConnections({
      userId: Number(req.user.id),
      eventId: Number(id),
      data,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async deleteOne(@Request() req: { user: User }, @Param('id') id: number) {
    return await this.eventsService.deleteOne({
      userId: Number(req.user.id),
      id: Number(id),
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

  @HttpCode(HttpStatus.OK)
  @Put('connect-services/:id')
  async connectService(
    @Body() data: { serviceId: number },
    @Request() req: { user: User },
    @Param('id') eventId: number,
  ) {
    return await this.eventsService.connectService({
      eventId: +eventId,
      serviceId: +data.serviceId,
      userId: +req.user.id,
    });
  }
}
