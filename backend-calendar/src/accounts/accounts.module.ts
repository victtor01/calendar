import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './repositories/accounts-repository';
import { PrismaAccountsRepository } from './repositories/prisma/prisma-accounts-repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [AccountsController],
  providers: [
    AccountsService,
    PrismaService,
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
  ],
})
export class AccountsModule {}
