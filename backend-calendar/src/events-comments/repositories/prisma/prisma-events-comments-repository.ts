import { CreateEventsCommentsDto } from 'src/events-comments/dto/create-events-comments.dto';
import { EventsComments } from 'src/events-comments/entities/events-comments.entity';
import { EventsCommentsRepository } from '../events-comments-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaEventsCommentsRepository
  implements EventsCommentsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateEventsCommentsDto): Promise<EventsComments> {
    const { content, eventId } = data;
    return await this.prismaService.eventsComments.create({
      data: {
        content,
        event: {
          connect: {
            id: eventId,
          },
        },
      },
    });
  }
}
