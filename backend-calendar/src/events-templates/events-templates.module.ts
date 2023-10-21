import { Module } from '@nestjs/common';
import { EventsTemplatesController } from './events-templates.controller';
import { EventsTemplatesService } from './events-templates.service';
import { PrismaService } from 'src/database/prisma.service';
import { EventsTemplatesRepository } from './repositories/events.templates-repository';
import { PrismaEventsTemplatesRepository } from './repositories/prisma/prisma-events-templates-repository';

@Module({
  controllers: [EventsTemplatesController],
  providers: [
    EventsTemplatesService,
    PrismaService,
    {
      provide: EventsTemplatesRepository,
      useClass: PrismaEventsTemplatesRepository,
    },
  ],
})
export class EventsTemplatesModule {}
