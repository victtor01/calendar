import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ConfirmationCodesRepository } from './repositories/codes-confirmation-repository';
import { PrismaCodesConfirmationRepository } from './repositories/prisma/prisma-codes-confirmation-repository';
import { ConfirmationCodesService } from './confirmation-codes.service';
import { ConfirmationCodesController } from './confirmation-codes.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    ConfirmationCodesService,
    EmailService,
    {
      provide: ConfirmationCodesRepository,
      useClass: PrismaCodesConfirmationRepository,
    },
  ],
  exports: [ConfirmationCodesService, ConfirmationCodesRepository],
  controllers: [ConfirmationCodesController],
})
export class ConfirmationCodesModule {}
