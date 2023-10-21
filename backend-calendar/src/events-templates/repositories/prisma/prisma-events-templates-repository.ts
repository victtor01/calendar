import CreateEventsTemplatesDto from 'src/events-templates/dto/create-events-templates.dto';
import { eventsTemplates } from 'src/events-templates/entities/events-templates.entity';
import { EventsTemplatesRepository } from '../events.templates-repository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaEventsTemplatesRepository
  implements EventsTemplatesRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<eventsTemplates[]> {
    return await this.prismaService.eventsTemplates.findMany({
      where: {
        userId,
      },
    });
  }

  async create(data: CreateEventsTemplatesDto): Promise<eventsTemplates> {
    const { userId, ...rest } = data;
    return await this.prismaService.eventsTemplates.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
