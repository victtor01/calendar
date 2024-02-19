import { Injectable } from '@nestjs/common';
import { ConfirmationCodesRepository } from './repositories/codes-confirmation-repository';
import { ConfirmationCodes } from './entities/confirmation-codes.entity';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ConfirmationCodesService {
  constructor(
    private readonly prismaCodesConfirmationRepository: ConfirmationCodesRepository,
    private readonly emailService: EmailService,
  ) {}

  private min = 100000;
  private max = 999999;

  private async random(): Promise<string> {
    return (
      Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
    ).toString();
  }

  async findByUserId(userId: number): Promise<ConfirmationCodes> {
    return this.prismaCodesConfirmationRepository.findOneByUserId(+userId);
  }

  async create(userId: number): Promise<ConfirmationCodes> {
    userId = typeof userId !== 'number' ? Number(userId) : userId;

    const randomCode = await this.random();

    const codeExists =
      await this.prismaCodesConfirmationRepository.findOneByUserId(+userId);

    if (codeExists) {
      console.log(codeExists);
      return codeExists;
    }

    return await this.prismaCodesConfirmationRepository.create({
      userId,
      code: randomCode,
    });
  }

  async createCustomize({
    userId,
    code,
  }: {
    userId: number;
    code: string;
  }): Promise<ConfirmationCodes> {
    return await this.prismaCodesConfirmationRepository.create({
      userId,
      code,
    });
  }

  async delete(id: number): Promise<any> {
    return await this.prismaCodesConfirmationRepository.delete(+id);
  }
}
