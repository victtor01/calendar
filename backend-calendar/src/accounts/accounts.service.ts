import { Injectable } from '@nestjs/common';
import { PrismaAccountsRepository } from './repositories/prisma/prisma-accounts-repository';
import { AccountsRepository } from './repositories/accounts-repository';
import { Accounts } from './entities/accounts.entity';
import { CreateAccountsDto } from './dto/create-accounts.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async create(body: CreateAccountsDto): Promise<Accounts> {
    return await this.accountsRepository.create(body);
  }
}
