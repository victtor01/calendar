import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { Clients } from './entities/clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientsDto } from './dto/create-clients.dto';
import { DeleteClientsDto } from './dto/delete-clients.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('')
  async findAll(@Request() req: any) {
    return await this.clientsService.findAll(req.user.id);
  }

  @Get('/find-by-date/:start/:end')
  async findByDate(
    @Request() req: { user: User },
    @Param('start') start: string,
    @Param('end') end: string,
  ) {
    return await this.clientsService.findOneByDate({
      userId: +req.user.id,
      start: new Date(start),
      end: new Date(end),
    });
  }

  @Post('create')
  async create(
    @Body() data: CreateClientsDto,
    @Request() req: any,
  ): Promise<Clients> {
    data.userId = req.user.id;
    return await this.clientsService.create(data);
  }

  @Delete('delete/:id')
  async delete(@Request() req: any, @Param('id') id: number): Promise<boolean> {
    return await this.clientsService.delete({
      userId: Number(req.user.id),
      id: Number(id),
    });
  }
}
