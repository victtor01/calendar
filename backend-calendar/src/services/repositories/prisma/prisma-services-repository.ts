import { CreateServiceDto } from 'src/services/dto/create-service.dto';
import { Service } from 'src/services/entities/service.entity';
import { ServicesRepository } from '../services-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

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
}
