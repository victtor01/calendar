import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../accounts-repository';
import { CreateAccountsDto } from 'src/accounts/dto/create-accounts.dto';
import { Accounts } from 'src/accounts/entities/accounts.entity';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateAccountDto } from 'src/accounts/dto/update-account.dto';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<Accounts[]> {
    return await this.prismaService.accounts.findMany({
      where: {
        userId,
      },
      include: {
        registers: true,
      },
    });
  }

  async findByCode(data: { userId: number; code: string }): Promise<Accounts> {
    const { userId, code } = data;
    return await this.prismaService.accounts.findUnique({
      where: {
        userId,
        code,
      },
    });
  }

  async update(data: UpdateAccountDto): Promise<any> {
    const { userId, id, name, description } = data;
    return await this.prismaService.accounts.update({
      where: {
        userId,
        id,
      },
      data: {
        name,
        description,
      },
    });
  }

  async create(data: CreateAccountsDto): Promise<Accounts> {
    const { userId, ...rest } = data;
    return await this.prismaService.accounts.create({
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
