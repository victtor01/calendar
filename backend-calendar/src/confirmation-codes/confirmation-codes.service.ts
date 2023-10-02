import { Injectable } from '@nestjs/common';
import { ConfirmationCodesRepository } from './repositories/codes-confirmation-repository';
import { ConfirmationCodes } from './entities/confirmation-codes.entity';

@Injectable()
export class ConfirmationCodesService {
  constructor(
    private readonly prismaCodesConfirmationRepository: ConfirmationCodesRepository,
  ) {}

  async create(userId: number): Promise<ConfirmationCodes> {
    const min = 100000;
    const max = 999999;
    const randomCode = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    return await this.prismaCodesConfirmationRepository.create({
      userId,
      code: randomCode,
    });

  }
}
