import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { PrismaService } from 'src/database/prisma.service';
import { EventsRepository } from './repositories/events-repository';
import { PrismaEventsRepository } from './repositories/prisma/prisma-events-repository';
import { EventsController } from './events.controller';

@Module({
  providers: [EventsService, PrismaService, {
    provide: EventsRepository,
    useClass: PrismaEventsRepository,
  }],
  controllers: [EventsController]
})
export class EventsModule {}
