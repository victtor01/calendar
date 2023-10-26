import { CreateEventsDto } from '../dto/create-events.dto';
import { findEventsByDateDto } from '../dto/find-events-by-date.dto';
import { findEventsDto } from '../dto/find-events.dto';
import { UpdateEventsDto } from '../dto/update-events.dto';
import { Events } from '../entities/events.entity';

export abstract class EventsRepository {
  abstract findAll(userId: number): Promise<Events[]>;
  abstract create(data: CreateEventsDto): Promise<Events>;
  abstract update(data: UpdateEventsDto): Promise<Events>;
  abstract findOne({ code, userId }: findEventsDto): Promise<Events>;
  abstract findByDate({ userId, start, end}: findEventsByDateDto): Promise<Events[]>;
}
