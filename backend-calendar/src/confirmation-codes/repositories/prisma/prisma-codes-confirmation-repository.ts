import { Injectable } from '@nestjs/common';
import { ConfirmationCodesRepository } from '../codes-confirmation-repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateConfirmationCodesDto } from 'src/confirmation-codes/dto/create-confirmation-codes.dto';
import { ConfirmationCodes } from 'src/confirmation-codes/entities/confirmation-codes.entity';

@Injectable()
export class PrismaCodesConfirmationRepository
  implements ConfirmationCodesRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findOne(code: string): Promise<ConfirmationCodes> {
    return await this.prisma.codes_confirmation.findFirst({
      where: {
        code,
      },
    });
  }

  async create(body: CreateConfirmationCodesDto): Promise<ConfirmationCodes> {
    const { userId, code } = body;
  
    const codeExist = await this.prisma.codes_confirmation.findFirst({
      where: { userId },
    });

    if(codeExist) {
      await this.prisma.codes_confirmation.delete({
        where: { userId },
      });
    }
    return await this.prisma.codes_confirmation.create({
      data: {
        userId,
        code,
      },
    });
  }

  async delete(id: number): Promise<boolean> {
    const res = await this.prisma.codes_confirmation.delete({
      where: { id },
    });

    if (res) {
      return true;
    }

    return false;
  }
}
