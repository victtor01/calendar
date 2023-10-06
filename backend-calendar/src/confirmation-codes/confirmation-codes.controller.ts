import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateConfirmationCodesDto } from './dto/create-confirmation-codes.dto';
import { ConfirmationCodesRepository } from './repositories/codes-confirmation-repository';
import { ConfirmationCodesService } from './confirmation-codes.service';
import { Public } from 'src/constants';
import { EmailService } from 'src/email/email.service';
import { ConfirmationCodes } from './entities/confirmation-codes.entity';

@Controller('confirmation-codes')
export class ConfirmationCodesController {
  constructor(
    private readonly confirmationCodesService: ConfirmationCodesService,
  ) {}

  @Public()
  @Post('create')
  async create(@Body() body: CreateConfirmationCodesDto): Promise<any> {
    return this.confirmationCodesService.create(body.userId);
  }
}
