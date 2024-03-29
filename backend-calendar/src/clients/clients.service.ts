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
import { UpdateClientDto } from './dto/update-clients.dto';
import { GetTop10ClientsDto } from './dto/get-top-10-clients.dto';

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
      const directoryPath = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        'clients',
      );
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

  async update({ data, userId }: { data: UpdateClientDto; userId: number }) {
    data.birth = new Date(data.birth);
    return await this.clientsRepository.update({
      userId,
      data,
    });
  }

  async create(data: CreateClientsDto): Promise<Clients> {
    data.birth = parseISO(data.birth.toString()) || new Date();
    return await this.clientsRepository.create(data);
  }

  async delete({ userId, id }: DeleteClientsDto): Promise<boolean> {
    return await this.clientsRepository.delete({ userId, id });
  }

  async findOneByDate(data: FindClientsByDateDto): Promise<Clients[]> {
    return await this.clientsRepository.findByDate(data);
  }

  getTop10Clients({ userId }: GetTop10ClientsDto) {
    return this.clientsRepository.getTop10Clients({ userId });
  }
}
