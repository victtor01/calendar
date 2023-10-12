import { CreateRegisterDto } from 'src/registers/dto/create-register.dto';
import { Register } from 'src/registers/entities/register.entity';
import { RegistersRepository } from '../registers-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaRegistersRepository implements RegistersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateRegisterDto): Promise<Register> {
    const { accountId, ...rest } = data;

    return await this.prisma.registers.create({
      data: {
        ...rest,
        account: {
          connect: {
            id: accountId,
          },
        },
      },
    });
  }
}
