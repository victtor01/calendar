import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesRepository } from './repositories/services-repository';
import { DeleteServiceDto } from './dto/delete-service.dto';
import { FindServiceByCodeDto } from './dto/find-service-by-code.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(private readonly serviceRepository: ServicesRepository) {}

  async create({ data, userId }: { data: CreateServiceDto; userId: number }) {
    if (!userId) {
      return new BadRequestException({
        message: 'Houve um erro ao tentar criar um serviço',
      });
    }

    if (!data.name || !data.price) {
      return new InternalServerErrorException({
        message: 'Algum campo obrigatório está vazio',
      });
    }

    data.userId = Number(userId);
    data.price = parseFloat(data.price.toString());

    return await this.serviceRepository.create(data);
  }

  async findAll(userId: number) {
    return await this.serviceRepository.findAll(Number(userId));
  }

  async findOneByCode({
    userId,
    code,
  }: FindServiceByCodeDto): Promise<Service> {
    return await this.serviceRepository.findOneByCode({
      userId,
      code,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  async delete({ userId, id }: DeleteServiceDto) {
    return await this.serviceRepository.delete({
      userId,
      id,
    });
  }
}
