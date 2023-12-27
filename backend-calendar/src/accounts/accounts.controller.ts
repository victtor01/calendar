import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  Param,
  Put,
} from '@nestjs/common';
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

  @Get('/find-by-code/:code')
  findOne(@Request() req: { user: User }, @Param('code') code: string) {
    return this.accountsService.findByCode({
      userId: +req.user.id,
      code,
    });
  }

  @Put('/update/:id')
  update(
    @Request() req: { user: User },
    @Param('id') id: string,
    @Body() data: { name: string; description: string },
  ) {
    const { name, description } = data;
    return this.accountsService.update({
      userId: +req.user.id,
      id: +id,
      name,
      description,
    });
  }

  @Post('/create')
  async create(@Request() req: any, @Body() body: CreateAccountsDto) {
    body.userId = req.user.id;
    return await this.accountsService.create(body);
  }
}
