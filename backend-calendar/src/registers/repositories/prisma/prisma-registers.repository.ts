import { CreateRegisterDto } from 'src/registers/dto/create-register.dto';
import { Register } from 'src/registers/entities/register.entity';
import { RegistersRepository } from '../registers-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateRegisterDto } from 'src/registers/dto/update-register.dto';

@Injectable()
export class PrismaRegistersRepository implements RegistersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number): Promise<Register[]> {
    return await this.prisma.registers.findMany({
      where: {
        userId,
      },
      orderBy: {
        createAt: 'desc',
      },
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
