import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateAccountsDto } from './dto/create-accounts.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

  @Post('/create')
  async create(@Request() req, @Body() body: CreateAccountsDto) {
    body.userId = req.user.id;
    return await this.accountsService.create(body);
  }
}
