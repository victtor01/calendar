import { CreateRegisterDto } from 'src/registers/dto/create-register.dto';
import { Register } from 'src/registers/entities/register.entity';
import { RegistersRepository } from '../registers-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateRegisterDto } from 'src/registers/dto/update-register.dto';
import { FindSumaryByDateDto } from 'src/registers/dto/find-register-sumary.dto';
import { FindRegisterWithPageDto } from 'src/registers/dto/find-register-with-page.dto';
import { FindRegisterByDateDto } from 'src/registers/dto/find-register-by-date.dto';

@Injectable()
export class PrismaRegistersRepository implements RegistersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number): Promise<Register[]> {
    return await this.prisma.registers.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async sumaryByDate({
    userId,
    start,
    end,
  }: FindSumaryByDateDto): Promise<any> {
    return await this.prisma.registers.groupBy({
      by: ['createdAt', 'type'],
      where: {
        userId,
        date: {
          gte: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
          lt: new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1),
        },
      },
      _sum: {
        value: true,
      },
    });
  }

  async findAllWithPage({
    userId,
    start,
    end,
  }: FindRegisterWithPageDto): Promise<Register[]> {
    return await this.prisma.registers.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: start,
      take: end - start,
    });
  }

  async findOne(code: string): Promise<Register> {
    return await this.prisma.registers.findUnique({
      where: {
        code: code,
      },
    });
  }

  async update({
    id,
    data,
  }: {
    id: number;
    data: UpdateRegisterDto;
  }): Promise<any> {
    return await this.prisma.registers.update({
      data: data,
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<any> {
    return await this.prisma.registers.delete({
      where: {
        id,
      },
    });
  }

  async findByDate({
    userId,
    start,
    end,
  }: FindRegisterByDateDto): Promise<Register[]> {
    return await this.prisma.registers.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
          lt: new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1),
        },
      },
    });
  }

  async create(data: CreateRegisterDto): Promise<Register> {
    const { accountId, userId, ...rest } = data;

    return await this.prisma.registers.create({
      data: {
        ...rest,
        account: {
          connect: {
            id: accountId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
