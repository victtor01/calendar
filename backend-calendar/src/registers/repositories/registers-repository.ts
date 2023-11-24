import { CreateRegisterDto } from '../dto/create-register.dto';
import { FindSumaryByDateDto } from '../dto/find-register-sumary.dto';
import { FindRegisterWithPageDto } from '../dto/find-register-with-page.dto';
import { UpdateRegisterDto } from '../dto/update-register.dto';
import { Register } from '../entities/register.entity';

export abstract class RegistersRepository {
  abstract findAll(userId: number): Promise<Register[]>;
  abstract findOne(code: string): Promise<Register>;
  abstract create(data: CreateRegisterDto): Promise<Register>;
  abstract delete(id: number): Promise<any>;
  abstract sumaryByDate(data: FindSumaryByDateDto): Promise<any>;
  abstract findAllWithPage({
    userId,
    start,
    end,
  }: FindRegisterWithPageDto): Promise<Register[]>;
  abstract update({
    id,
    data,
  }: {
    id: number;
    data: UpdateRegisterDto;
  }): Promise<any>;
}
