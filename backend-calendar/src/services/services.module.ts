import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ServicesRepository } from './repositories/services-repository';
import { PrismaServicesRepository } from './repositories/prisma/prisma-services-repository';

@Module({
  controllers: [ServicesController],
  providers: [
    ServicesService,
    PrismaService,
    {
      provide: ServicesRepository,
      useClass: PrismaServicesRepository,
    },
  ],
})
export class ServicesModule {}
