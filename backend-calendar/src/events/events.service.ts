import { BadRequestException, Injectable } from '@nestjs/common';
import { EventsRepository } from './repositories/events-repository';
import { CreateEventsDto } from './dto/create-events.dto';
import { Events } from './entities/events.entity';
import { addDays, formatISO, parseISO, subDays } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { UpdateEventsDto } from './dto/update-events.dto';
import { findEventsDto } from './dto/find-events.dto';
import { DeleteEventsDto } from './dto/delete-events.dto';
import { DeleteManyEventsDto } from './dto/delete-many-events.dto';
import { UpdateConnectManyDto } from './dto/update-connect-many.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getAll(userId: number): Promise<Events[]> {
    return await this.eventsRepository.findAll(Number(userId));
  }

  async create(data: CreateEventsDto): Promise<Events> {
    data.start = new Date(data.start.toString());
    data.end = parseISO(data.end.toString());
    return await this.eventsRepository.create(data);
  }

  async update(data: UpdateEventsDto): Promise<Events> {
    data.start = parseISO(data.start.toString());
    data.end = parseISO(data.end.toString());
    return await this.eventsRepository.update(data);
  }

  async findByWeek(userId: number): Promise<Events[]> {
    const today = new Date();
    const threeDaysAgo = subDays(today, 3);
    const threeDaysLater = addDays(today, 3);

    return await this.eventsRepository.findByDate({
      userId,
      start: threeDaysAgo,
      end: threeDaysLater,
    });
  }

  async delete({ code, userId }: DeleteEventsDto): Promise<any> {
    const findEvent = await this.eventsRepository.findOne({ code, userId });
  }

  async deleteMany({ ids, userId }: DeleteManyEventsDto): Promise<any> {
    const eventsPertences = this.eventsRepository.deleteMany({
      ids,
      userId,
    });
  }

  async updateConnections({
    userId,
    eventId,
    data,
  }: {
    userId: number;
    eventId: number;
    data: { connections: number[]; disconnections: number[] };
  }): Promise<any> {
    const { connections, disconnections } = data;
    const event: Events = await this.eventsRepository.findById({
      id: eventId,
      userId,
    });

    const { clients } = event;

    if (!clients || clients?.length < 1) {
      const connects = connections.map((conn) => ({ id: conn }));
      await this.eventsRepository.connectMany({
        eventId,
        connects,
        disconnects: [],
      });
      return;
    }

    const connects =
      connections
        ?.filter(
          (connectionId) =>
            !clients?.some((client) => client.id === connectionId),
        )
        ?.map((id) => ({ id })) || [];

    const disconnects =
      clients
        ?.filter((client) => disconnections?.includes(client.id))
        .map((item) => ({ id: item.id })) || [];

    await this.eventsRepository.connectMany({
      eventId,
      connects,
      disconnects,
    });
  }

  async findOne({ code, userId }: findEventsDto) {
    if (!code) {
      return new BadRequestException({
        message: 'Dados passádos inválidos!',
      });
    }
    return await this.eventsRepository.findOne({
      code,
      userId,
    });
  }

  async deleteOne({ userId, id }) {
    const event = this.eventsRepository.findById({
      userId,
      id,
    });

    if(!event) {
      return new BadRequestException({
        message: 'você não tem permissão para excluir esse evento'
      });
    }

    return await this.eventsRepository.delete(id);
  }
}
