import { Injectable } from '@nestjs/common';
import { ClientsRepository } from './repositories/clients-repository';
import { Clients } from './entities/clients.entity';
import { CreateClientsDto } from './dto/create-clients.dto';
import { parseISO } from 'date-fns';
import { DeleteClientsDto } from './dto/delete-clients.dto';
import { FindClientsByDateDto } from './dto/find-clients-by-date.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async findAll(userId: number): Promise<Clients[]> {
    return await this.clientsRepository.findAll(Number(userId));
  }

  async create(data: CreateClientsDto): Promise<Clients> {
    data.birth = parseISO(data.birth.toString());
    return await this.clientsRepository.create(data);
  }

  async delete({ userId, id }: DeleteClientsDto): Promise<boolean> {
    return await this.clientsRepository.delete({ userId, id });
  }

  async findOneByDate(data: FindClientsByDateDto): Promise<Clients[]> {
    return await this.clientsRepository.findByDate(data);
  } 
}
