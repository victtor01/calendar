import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { RegistersService } from './registers.service';
import { UpdateRegisterDto } from './dto/update-register.dto';

@Controller('registers')
export class RegistersController {
  constructor(private readonly registerService: RegistersService) {}

  @Get('')
  async findAll(@Request() req: any) {
    return await this.registerService.findAll(req.user.id);
  }

  @Get('/find/:code')
  async findOne(@Param('code') code: string) {
    return await this.registerService.findOne(code);
  }

  @Post('create')
  async create(@Body() data: CreateRegisterDto, @Request() req: any) {
    //Transformar em upercase
    data.type.toLocaleUpperCase();
    // por enquanto é necessário deletar a data!
    delete data.date;
    // colocar o userId
    data.userId = req.user.id;

    return await this.registerService.create(data);
  }

  @Put('update/:code')
  async update(
    @Body() data: UpdateRegisterDto,
    @Param('code') code: string,
    @Request() req: any,
  ) {
    console.log(data);
    return await this.registerService.update({ userId: req.user.id, code, data });
  }

  @Delete('delete/:id')
  async deleteRegister(@Param('id') id: number) {
    return await this.registerService.delete(id);
  }
}
