import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { CreateAccountsDto } from './dto/create-accounts.dto';
import { AccountsService } from './accounts.service';
import { User } from 'src/users/entities/user.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('')
  async findAll(@Request() req: any) {
    return await this.accountsService.findAll(req.user.id);
  }

  @Post('/create')
  async create(@Request() req: any, @Body() body: CreateAccountsDto) {
    body.userId = req.user.id;
    return await this.accountsService.create(body);
  }
}
