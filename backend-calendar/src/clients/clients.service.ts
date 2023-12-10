import { Injectable } from '@nestjs/common';
import { ClientsRepository } from './repositories/clients-repository';
import { Clients } from './entities/clients.entity';
import { CreateClientsDto } from './dto/create-clients.dto';
import { parseISO } from 'date-fns';
import { DeleteClientsDto } from './dto/delete-clients.dto';
import { FindClientsByDateDto } from './dto/find-clients-by-date.dto';
import { FindClientByCode } from './dto/find-client-by-code.dto';
import { UpdateClientPhotoDto } from './dto/update-client-photo.dto';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async findAll(userId: number): Promise<Clients[]> {
    return await this.clientsRepository.findAll(Number(userId));
  }

  async findOneByCode(data: FindClientByCode): Promise<Clients> {
    return await this.clientsRepository.findByCode(data);
  }

  async updatePhoto(data: UpdateClientPhotoDto): Promise<any> {
    const { userId, id, photo } = data;
    const { photo: currentPhoto, ...infoRest } =
      await this.clientsRepository.findById({
        userId,
        id,
      });

    if (currentPhoto) {
      const directoryPath = path.join(__dirname, '..', '..', 'uploads', 'clients');
      const filePath = path.join(directoryPath, currentPhoto);

      console.log(filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return await this.clientsRepository.updatePhoto({
      userId,
      photo,
      id,
    });
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
