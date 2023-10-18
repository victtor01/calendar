import { CreateClientsDto } from 'src/clients/dto/create-clients.dto';
import { Clients } from 'src/clients/entities/clients.entity';
import { ClientsRepository } from '../clients-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DeleteClientsDto } from 'src/clients/dto/delete-clients.dto';

@Injectable()
export class PrismaClientsRepository implements ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number): Promise<Clients[]> {
    return await this.prisma.clients.findMany({
      where: { userId },
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

  async delete({ userId, id }: DeleteClientsDto): Promise<boolean> {
    const response = await this.prisma.clients.delete({
      where: {
        id,
        userId,
      },
    });

    return !!response
  }
}
