import { Module } from '@nestjs/common';
import { RegistersController } from './registers.controller';
import { RegistersService } from './registers.service';
import { PrismaService } from 'src/database/prisma.service';
import { RegistersRepository } from './repositories/registers-repository';
import { PrismaRegistersRepository } from './repositories/prisma/prisma-registers.repository';

@Module({
  controllers: [RegistersController],
  providers: [
    RegistersService,
    PrismaService,
    {
      provide: RegistersRepository,
      useClass: PrismaRegistersRepository
    }
  ]
})
export class RegistersModule {}
