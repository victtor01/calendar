import { CreateEventsDto } from 'src/events/dto/create-events.dto';
import { Events } from 'src/events/entities/events.entity';
import { EventsRepository } from '../events-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateEventsDto } from 'src/events/dto/update-events.dto';
import { findEventsDto } from 'src/events/dto/find-events.dto';
import { findEventsByDateDto } from 'src/events/dto/find-events-by-date.dto';
import { DeleteManyEventsDto } from 'src/events/dto/delete-many-events.dto';
import { UpdateConnectManyDto } from 'src/events/dto/update-connect-many.dto';
import { UpdateConnectService } from 'src/events/dto/update-connect-service';
import { UpdateStatusEventsDto } from 'src/events/dto/update-status-events.dto';
import { eventsTemplates } from 'src/events-templates/entities/events-templates.entity';

@Injectable()
export class PrismaEventsRepository implements EventsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<Events[]> {
    return await this.prismaService.events.findMany({
      where: { userId },
      include: {
        services: true,
        clients: true,
        comments: true,
        templates: true,
      },
    });
  }

  async update(data: UpdateEventsDto): Promise<Events> {
    const { id, ...rest } = data;
    const res = await this.prismaService.events.update({
      where: { id },
      data: {
        name: rest.name,
        description: rest.description,
        color: rest.color,
        allDay: rest.allDay,
        status: rest.status,
        start: rest.start,
        end: rest.end,
      },
    });
    return res;
  }

  async updateStatus({
    id,
    userId,
    status,
  }: UpdateStatusEventsDto): Promise<Events> {
    return await this.prismaService.events.update({
      where: {
        id,
        userId,
      },
      data: {
        status,
      },
    });
  }

  async connectTemplate(data: {
    templates: Array<{ id: number }>;
    userId: number;
    eventId: number;
  }): Promise<any> {
    const { userId, templates, eventId: id } = data;
    return await this.prismaService.events.update({
      where: {
        id,
        userId,
      },
      data: {
        templates: {
          connect: templates,
        },
      },
    });
  }

  async findOne({ code, userId }: findEventsDto): Promise<Events> {
    return await this.prismaService.events.findFirst({
      where: {
        code,
        userId,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        clients: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        services: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        templates: true,
      },
    });
  }

  async delete(id: number): Promise<any> {
    return await this.prismaService.events.delete({
      where: { id },
    });
  }

  async deleteMany({ ids, userId }: DeleteManyEventsDto): Promise<any> {
    return await this.prismaService.events.deleteMany({
      where: {
        userId,
        id: {
          in: ids,
        },
      },
    });
  }

  async findByDate(data: findEventsByDateDto): Promise<Events[]> {
    const { userId, start, end } = data;
    const res = await this.prismaService.events.findMany({
      where: {
        userId,
        start: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        start: 'asc',
      },
      include: {
        clients: true,
        services: true,
      },
    });
    return res;
  }

  async connectMany({
    eventId,
    connects,
    disconnects,
  }: UpdateConnectManyDto): Promise<any> {
    return await this.prismaService.events.update({
      where: {
        id: eventId,
      },
      data: {
        clients: {
          connect: connects,
          disconnect: disconnects,
        },
      },
    });
  }

  async connectService({
    eventId,
    serviceId,
    userId,
  }: UpdateConnectService): Promise<any> {
    return await this.prismaService.events.update({
      where: {
        id: eventId,
        userId,
      },
      data: {
        services: {
          connect: {
            id: serviceId,
          },
        },
      },
    });
  }

  async discconectService({
    eventId,
    serviceId,
    userId,
  }: UpdateConnectService): Promise<Events> {
    return await this.prismaService.events.update({
      where: {
        id: eventId,
        userId,
      },
      data: {
        services: {
          disconnect: {
            id: serviceId,
          },
        },
      },
    });
  }

  async findById({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<Events> {
    return await this.prismaService.events.findUnique({
      where: { id, userId },
      include: {
        clients: true,
        services: true,
      },
    });
  }

  async create(data: CreateEventsDto): Promise<Events> {
    const { userId, ...rest } = data;
    return await this.prismaService.events.create({
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
