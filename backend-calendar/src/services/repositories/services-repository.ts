import { CreateServiceDto } from '../dto/create-service.dto';
import { Service } from '../entities/service.entity';

export abstract class ServicesRepository {
  abstract findAll(userId: number): Promise<Service[]>
  abstract create(data: CreateServiceDto): Promise<Service>;
}
