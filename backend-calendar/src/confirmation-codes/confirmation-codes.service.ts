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
    return (Math.floor(Math.random() * (this.max - this.min + 1)) + this.min).toString();
  }


  async create(userId: number): Promise<ConfirmationCodes> {
    userId = typeof userId !== 'number' ? Number(userId) : userId

    const randomCode = await this.random()

    const code = await this.prismaCodesConfirmationRepository.create({
      userId,
      code: randomCode,
    });
  
    return code
  }
}
