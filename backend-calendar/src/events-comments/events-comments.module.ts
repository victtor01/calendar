import { Module } from '@nestjs/common';
import { EventsCommentsController } from './events-comments.controller';
import { EventsCommentsService } from './events-comments.service';
import { PrismaService } from 'src/database/prisma.service';
import { EventsCommentsRepository } from './repositories/events-comments-repository';
import { PrismaEventsCommentsRepository } from './repositories/prisma/prisma-events-comments-repository';

@Module({
  controllers: [EventsCommentsController],
  providers: [EventsCommentsService, PrismaService, {
    provide: EventsCommentsRepository,
    useClass: PrismaEventsCommentsRepository,
  }]
})
export class EventsCommentsModule {}
