import { BadRequestException, Injectable } from '@nestjs/common';
import { EventsRepository } from './repositories/events-repository';
import { CreateEventsDto } from './dto/create-events.dto';
import { Events } from './entities/events.entity';
import {
  addDays,
  parseISO,
  subDays,
  parse,
  format,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { UpdateEventsDto } from './dto/update-events.dto';
import { findEventsDto } from './dto/find-events.dto';
import { DeleteEventsDto } from './dto/delete-events.dto';
import { DeleteManyEventsDto } from './dto/delete-many-events.dto';
import { UpdateConnectService } from './dto/update-connect-service';
import { findEventsByDateDto } from './dto/find-events-by-date.dto';
import { UpdateStatusEventsDto } from './dto/update-status-events.dto';
import { eventsTemplates } from 'src/events-templates/entities/events-templates.entity';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  private async validateFields(data: UpdateEventsDto | Events): Promise<{
    success: boolean;
    errors: Array<{ message: string; type: string }>;
  }> {
    const errors = [];

    const { name, start, end } = data;

    if (!name || !start || !end) {
      errors.push({
        message: '',
        type: 'Invalidate fields',
      });
    }

    return {
      success: !errors?.length,
      errors,
    };
  }

  async getAll(userId: number): Promise<Events[]> {
    return await this.eventsRepository.findAll(Number(userId));
  }

  async create(data: CreateEventsDto): Promise<Events> {
    data.start = new Date(data.start.toString());
    data.end = parseISO(data.end.toString());
    return await this.eventsRepository.create(data);
  }

  async update({
    userId,
    data,
  }: {
    userId: number;
    data: UpdateEventsDto;
  }): Promise<Events> {
    const { success, errors } = await this.validateFields(data);

    if (!success) {
      throw new BadRequestException({
        massage: 'Invalidate field',
        errors,
      });
    }

    const templates = data.templates.map((template) => ({ id: template.id }));

    await this.eventsRepository.connectTemplate({
      eventId: +data.id,
      templates,
      userId,
    });

    data.start = new Date(data.start.toString());
    data.end = parseISO(data.end.toString());

    return await this.eventsRepository.update(data);
  }

  async updateStatus(data: UpdateStatusEventsDto): Promise<Events> {
    return await this.eventsRepository.updateStatus(data);
  }

  async findByWeek(userId: number): Promise<Events[]> {
    const today = new Date();
    const threeDaysAgo = startOfDay(subDays(today, 3));
    const threeDaysLater = endOfDay(addDays(today, 3));

    return await this.eventsRepository.findByDate({
      userId,
      start: threeDaysAgo,
      end: threeDaysLater,
    });
  }

  async findByDate({
    userId,
    start,
    end,
  }: findEventsByDateDto): Promise<Events[]> {
    return await this.eventsRepository.findByDate({
      userId,
      start,
      end,
    });
  }

  async delete({ code, userId }: DeleteEventsDto): Promise<any> {
    await this.eventsRepository.findOne({ code, userId });
  }

  async deleteMany({ ids, userId }: DeleteManyEventsDto): Promise<any> {
    await this.eventsRepository.deleteMany({
      ids,
      userId,
    });
  }

  async connectService({
    eventId,
    serviceId,
    userId,
  }: UpdateConnectService): Promise<any> {
    const event = await this.eventsRepository.findById({
      id: eventId,
      userId,
    });

    if (!event) {
      return new BadRequestException({
        message: 'Evento não encontrado!',
      });
    }

    const service = event?.services?.filter(
      (item) => item.id.toString() === serviceId.toString(),
    );

    if (service[0]?.id) {
      return await this.eventsRepository.discconectService({
        eventId,
        serviceId,
        userId,
      });
    } else {
      return await this.eventsRepository.connectService({
        eventId,
        serviceId,
        userId,
      });
    }
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

    if (!event) {
      return new BadRequestException({
        message: 'você não tem permissão para excluir esse evento',
      });
    }

    return await this.eventsRepository.delete(id);
  }
}
