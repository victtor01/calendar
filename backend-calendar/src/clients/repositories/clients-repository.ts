import { CreateClientsDto } from '../dto/create-clients.dto';
import { DeleteClientsDto } from '../dto/delete-clients.dto';
import { FindClientByCode } from '../dto/find-client-by-code.dto';
import { FindClientById } from '../dto/find-client-by-id.dto';
import { FindClientsByDateDto } from '../dto/find-clients-by-date.dto';
import { UpdateClientPhotoDto } from '../dto/update-client-photo.dto';
import { UpdateClientDto } from '../dto/update-clients.dto';
import { Clients } from '../entities/clients.entity';

export abstract class ClientsRepository {
  abstract findAll(userId: number): Promise<Clients[]>;
  abstract create(data: CreateClientsDto): Promise<Clients>;
  abstract delete({ userId, id }: DeleteClientsDto): Promise<boolean>;
  abstract findByDate(data: FindClientsByDateDto): Promise<Clients[]>;
  abstract findByCode({ userId, code }: FindClientByCode): Promise<Clients>;
  abstract findById({ userId, id }: FindClientById): Promise<Clients>;
  abstract updatePhoto({ photo, id, userId}: UpdateClientPhotoDto): Promise<Clients>;
  abstract update({ userId, data }: { data: UpdateClientDto, userId: number }): Promise<any>;
}
