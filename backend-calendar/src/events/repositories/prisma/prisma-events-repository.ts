import { CreateEventsDto } from 'src/events/dto/create-events.dto';
import { Events } from 'src/events/entities/events.entity';
import { EventsRepository } from '../events-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateEventsDto } from 'src/events/dto/update-events.dto';
import { findEventsDto } from 'src/events/dto/find-events.dto';
import { findEventsByDateDto } from 'src/events/dto/find-events-by-date.dto';

@Injectable()
export class PrismaEventsRepository implements EventsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<Events[]> {
    return await this.prismaService.events.findMany({
      where: { userId },
    });
  }

  async update(data: UpdateEventsDto): Promise<any> {
    const { id, ...rest } = data;
    return await this.prismaService.events.update({
      where: { id },
      data: rest,
    });
  }

  async findOne({ code, userId }: findEventsDto): Promise<Events> {
    return await this.prismaService.events.findFirst({
      where: {
        code,
        userId,
      },
      include: {
        comments: true,
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
        start: 'asc', // 'desc' indica ordenação decrescente (do mais recente para o mais antigo)
      },
    });
    return res;
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
