import { CreateServiceDto } from 'src/services/dto/create-service.dto';
import { Service } from 'src/services/entities/service.entity';
import { ServicesRepository } from '../services-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DeleteServiceDto } from 'src/services/dto/delete-service.dto';
import { findServiceDto } from 'src/services/dto/find-service.dto';
import { FindServiceByCodeDto } from 'src/services/dto/find-service-by-code.dto';

@Injectable()
export class PrismaServicesRepository implements ServicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateServiceDto): Promise<Service> {
    const { userId, ...rest } = data;
    return this.prisma.services.create({
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

  async findAll(userId: number): Promise<Service[]> {
    return await this.prisma.services.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneByCode({
    userId,
    code,
  }: FindServiceByCodeDto): Promise<Service> {
    return await this.prisma.services.findFirst({
      where: {
        userId,
        code,
      },
    });
  }

  async delete({ userId, id }: DeleteServiceDto): Promise<boolean> {
    const deleted = await this.prisma.services.delete({
      where: {
        userId,
        id,
      },
    });

    return deleted ? true : false;
  }

  async findOne({ userId, id }: findServiceDto): Promise<Service> {
    return await this.prisma.services.findFirst({
      where: {
        userId,
        id,
      },
    });
  }
}
