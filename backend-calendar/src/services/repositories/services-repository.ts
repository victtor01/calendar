import { CreateServiceDto } from '../dto/create-service.dto';
import { DeleteServiceDto } from '../dto/delete-service.dto';
import { FindServiceByCodeDto } from '../dto/find-service-by-code.dto';
import { findServiceDto } from '../dto/find-service.dto';
import { Service } from '../entities/service.entity';

export abstract class ServicesRepository {
  abstract findAll(userId: number): Promise<Service[]>
  abstract create(data: CreateServiceDto): Promise<Service>;
  abstract delete({ userId, id }: DeleteServiceDto): Promise<boolean>;
  abstract findOne({ userId, id }: findServiceDto): Promise<Service>;
  abstract findOneByCode({ userId, code }: FindServiceByCodeDto): Promise<Service>;
}
