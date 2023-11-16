import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaAccountsRepository } from './repositories/prisma/prisma-accounts-repository';
import { AccountsRepository } from './repositories/accounts-repository';
import { Accounts } from './entities/accounts.entity';
import { CreateAccountsDto } from './dto/create-accounts.dto';
import { accounts } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async create(body: CreateAccountsDto): Promise<Accounts | BadRequestException> {
    if(!body.name || !body.name) {
      return new BadRequestException({
        message: 'Falta campos para criar uma nova conta'
      })
    }

    const allAccounts = await this.accountsRepository.findAll(+body.userId);

    if(allAccounts.length >= 10) {
      return new BadRequestException({
        message: 'máximo de contas alcançada!'
      })
    }
    
    return await this.accountsRepository.create(body);
  }

  async findAll(userId: number) : Promise<accounts[]> {
    userId = typeof userId === 'number' ? userId : Number(userId);
    return await this.accountsRepository.findAll(userId)
  }
}
