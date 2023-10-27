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
}
