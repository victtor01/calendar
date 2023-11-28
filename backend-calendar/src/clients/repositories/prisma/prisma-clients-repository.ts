import { CreateClientsDto } from 'src/clients/dto/create-clients.dto';
import { Clients } from 'src/clients/entities/clients.entity';
import { ClientsRepository } from '../clients-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DeleteClientsDto } from 'src/clients/dto/delete-clients.dto';
import { FindClientsByDateDto } from 'src/clients/dto/find-clients-by-date.dto';

@Injectable()
export class PrismaClientsRepository implements ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number): Promise<Clients[]> {
    return await this.prisma.clients.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(data: CreateClientsDto): Promise<Clients> {
    const { userId, ...rest } = data;
    return await this.prisma.clients.create({
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

  async findByDate({
    userId,
    start,
    end,
  }: FindClientsByDateDto): Promise<Clients[]> {
    return await this.prisma.clients.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
          lt: new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1),
        },
      },
    });
  }

  async delete({ userId, id }: DeleteClientsDto): Promise<boolean> {
    const response = await this.prisma.clients.delete({
      where: {
        id,
        userId,
      },
    });

    return !!response;
  }
}
