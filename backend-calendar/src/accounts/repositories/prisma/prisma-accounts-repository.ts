import { Injectable } from '@nestjs/common';
import { AccountsRepository } from '../accounts-repository';
import { CreateAccountsDto } from 'src/accounts/dto/create-accounts.dto';
import { Accounts } from 'src/accounts/entities/accounts.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<Accounts[]> {
    return await this.prismaService.accounts.findMany({
      where: {
        userId,
      },
    });
  }

  async create(data: CreateAccountsDto): Promise<Accounts> {
    console.log('passou aqui!');
    console.log(data);
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
