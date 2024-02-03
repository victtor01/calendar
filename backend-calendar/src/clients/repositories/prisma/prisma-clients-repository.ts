import { CreateClientsDto } from 'src/clients/dto/create-clients.dto';
import { Clients } from 'src/clients/entities/clients.entity';
import { ClientsRepository } from '../clients-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DeleteClientsDto } from 'src/clients/dto/delete-clients.dto';
import { FindClientsByDateDto } from 'src/clients/dto/find-clients-by-date.dto';
import { FindClientByCode } from 'src/clients/dto/find-client-by-code.dto';
import { UpdateClientPhotoDto } from 'src/clients/dto/update-client-photo.dto';
import { FindClientById } from 'src/clients/dto/find-client-by-id.dto';
import { UpdateClientDto } from 'src/clients/dto/update-clients.dto';
import { GetTop10ClientsDto } from 'src/clients/dto/get-top-10-clients.dto';

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

  async updatePhoto({
    photo,
    id,
    userId,
  }: UpdateClientPhotoDto): Promise<Clients> {
    return await this.prisma.clients.update({
      where: {
        id,
        userId,
      },
      data: {
        photo,
      },
    });
  }

  async update({ userId, data }: { userId: number; data: UpdateClientDto }) {
    const { id, ...rest } = data;
    return await this.prisma.clients.update({
      data: { ...rest },
      where: {
        id: Number(data.id),
        userId,
      },
    });
  }

  async findById({ userId, id }: FindClientById): Promise<Clients> {
    return await this.prisma.clients.findUnique({
      where: {
        userId,
        id,
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

  async findByCode({ userId, code }: FindClientByCode): Promise<Clients> {
    return await this.prisma.clients.findUnique({
      where: {
        userId,
        code,
      },
      include: {
        events: true,
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
      include: {
        events: true,
      },
    });
  }

  async getTop10Clients({ userId }: GetTop10ClientsDto): Promise<Clients[]> {
    return await this.prisma.clients.findMany({
      take: 10,
      where: {
        userId,
      },
      orderBy: {
        events: {
          _count: 'desc',
        },
      },
      include: {
        events: {
          include: {
            services: true,
          },
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
