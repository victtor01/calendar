import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Register } from './entities/register.entity';
import { RegistersRepository } from './repositories/registers-repository';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { parseISO, format } from 'date-fns';

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

  async delete(id: number): Promise<any> {
    return await this.registersRepository.delete(Number(id));
  }

  async update({
    userId,
    code,
    data,
  }: {
    userId: number;
    code: string;
    data: UpdateRegisterDto;
  }): Promise<boolean | BadRequestException> {
    try {
      const allRegisters = await this.registersRepository.findAll(
        Number(userId),
      );

      const pertences = allRegisters.filter((per) => per.code === code)[0];

      if (!pertences || !pertences?.name) {
        return new BadRequestException({
          message: 'houve um erro no update do item! item não encontrado!',
        });
      }

      const { id } = pertences;
      data.value = parseFloat(data.value.toString());

      data.date = parseISO(data.date.toString()); 

      const updated = await this.registersRepository.update({ id, data });

      if (!updated) {
        return new BadRequestException({
          message: 'Não foi possível fazer o udpate do item!',
        });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  async findOne(code: string): Promise<Register> {
    return await this.registersRepository.findOne(code);
  }
}
