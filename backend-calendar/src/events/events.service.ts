import { Injectable } from '@nestjs/common';
import { EventsRepository } from './repositories/events-repository';
import { CreateEventsDto } from './dto/create-events.dto';
import { Events } from './entities/events.entity';
import { parseISO } from 'date-fns';
import { UpdateEventsDto } from './dto/update-events.dto';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getAll(userId: number): Promise<Events[]> {
    return await this.eventsRepository.findAll(Number(userId))
  }

  async create(data: CreateEventsDto): Promise<Events> {
    data.start = parseISO(data.start.toString());
    data.end = parseISO(data.end.toString());

    return await this.eventsRepository.create(data);
}

async update(data: UpdateEventsDto): Promise<any> {
    
    data.start = parseISO(data.start.toString()); 
    data.end = parseISO(data.end.toString()); 
    
    console.log(data)
    return await this.eventsRepository.update(data)
  }
}
