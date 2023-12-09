import { CreateEventsDto } from '../dto/create-events.dto';
import { DeleteManyEventsDto } from '../dto/delete-many-events.dto';
import { findEventsByDateDto } from '../dto/find-events-by-date.dto';
import { findEventsDto } from '../dto/find-events.dto';
import { UpdateConnectManyDto } from '../dto/update-connect-many.dto';
import { UpdateConnectService } from '../dto/update-connect-service';
import { UpdateEventsDto } from '../dto/update-events.dto';
import { UpdateStatusEventsDto } from '../dto/update-status-events.dto';
import { Events } from '../entities/events.entity';

export abstract class EventsRepository {
  abstract findAll(userId: number): Promise<Events[]>;
  abstract findById({ id, userId }: { id: number, userId: number }): Promise<Events>
  abstract create(data: CreateEventsDto): Promise<Events>;
  abstract delete(id: number): Promise<any>;
  abstract update(data: UpdateEventsDto): Promise<Events>;
  abstract deleteMany({ ids, userId }: DeleteManyEventsDto): Promise<any>;
  abstract findByDate({ userId, start, end }: findEventsByDateDto): Promise<Events[]>;
  abstract findOne({ code, userId }: findEventsDto): Promise<Events>;
  abstract connectMany({ eventId, connects, disconnects }: UpdateConnectManyDto): Promise<any[]>
  abstract connectService({ eventId, serviceId, userId }: UpdateConnectService): Promise<Events>
  abstract discconectService(data: UpdateConnectService): Promise<Events>
  abstract updateStatus(data: UpdateStatusEventsDto): Promise<Events>;
}
