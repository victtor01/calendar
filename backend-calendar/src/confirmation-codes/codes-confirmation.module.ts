import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ConfirmationCodesRepository } from './repositories/codes-confirmation-repository';
import { PrismaCodesConfirmationRepository } from './repositories/prisma/prisma-codes-confirmation-repository';
import { ConfirmationCodesService } from './confirmation-codes.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    ConfirmationCodesService,
    {
      provide: ConfirmationCodesRepository,
      useClass: PrismaCodesConfirmationRepository,
    },
  ],
  exports: [
    ConfirmationCodesService,
    ConfirmationCodesRepository
  ]
})
export class ConfirmationCodesModule {}
