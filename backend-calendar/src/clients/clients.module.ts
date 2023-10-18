import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { PrismaService } from 'src/database/prisma.service';
import { ClientsRepository } from './repositories/clients-repository';
import { PrismaClientsRepository } from './repositories/prisma/prisma-clients-repository';
import { ClientsController } from './clients.controller';

@Module({
  providers: [
    ClientsService,
    PrismaService,
    { provide: ClientsRepository, useClass: PrismaClientsRepository },
  ],
  controllers: [ClientsController],
})
export class ClientsModule {}
