import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';
import { UsersService } from './users.service';
import { ConfirmationCodesModule } from 'src/confirmation-codes/codes-confirmation.module';
import { EmailService } from 'src/email/email.service';
@Module({
  imports: [ConfirmationCodesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    EmailService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
