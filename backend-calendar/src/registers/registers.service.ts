import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Register } from './entities/register.entity';
import { RegistersRepository } from './repositories/registers-repository';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { parseISO, format } from 'date-fns';
import { FindSumaryByDateDto } from './dto/find-register-sumary.dto';
import { FindRegisterWithPageDto } from './dto/find-register-with-page.dto';

@Injectable()
export class RegistersService {
  constructor(private readonly registersRepository: RegistersRepository) {}

  async findAll(userId: number): Promise<Register[]> {
    userId = typeof userId != 'number' ? Number(userId) : userId;
    return await this.registersRepository.findAll(userId);
  }

  async sumaryByDate({
    start,
    end,
    userId,
  }: FindSumaryByDateDto): Promise<any> {
    return await this.registersRepository.sumaryByDate({
      userId,
      start,
      end,
    });
  }

  async create(data: CreateRegisterDto): Promise<Register> {
    data.value = Number(data.value);
    return await this.registersRepository.create(data);
  }

  async delete(id: number): Promise<any> {
    return await this.registersRepository.delete(Number(id));
  }

  async findAllWithPage(data: { userId: number; page: string }): Promise<{
    registers: Register[];
    countPage: number;
  }> {
    const NUM_PAGES = 15;

    const { userId, page } = data;
    const start = Number(page) * NUM_PAGES - NUM_PAGES || 0;
    const end = Number(page) * NUM_PAGES || NUM_PAGES;

    const registers = await this.registersRepository.findAllWithPage({
      userId,
      start,
      end,
    });

    const countPage = await (async () => {
      const total = (await this.registersRepository.findAll(userId)).length;
      const numPages = total / NUM_PAGES;
      return Math.ceil(numPages);
    })();

    return {
      registers,
      countPage,
    };
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
