import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Register } from './entities/register.entity';
import { RegistersRepository } from './repositories/registers-repository';

@Injectable()
export class RegistersService {
  constructor(private readonly registersRepository: RegistersRepository) {}

  async findAll(userId: number) {
    userId = typeof userId != 'number' ? Number(userId) : userId;
    return await this.registersRepository.findAll(userId);
  }

  async create(data: CreateRegisterDto): Promise<Register> {
    data.value = Number(data.value);
    return await this.registersRepository.create(data);
  }
}
