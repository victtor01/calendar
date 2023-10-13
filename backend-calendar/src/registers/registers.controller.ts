import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { RegistersService } from './registers.service';

@Controller('registers')
export class RegistersController {
  constructor(private readonly registerService: RegistersService) {}

  @Get('')
  async findAll(@Request() req: any) {
    return await this.registerService.findAll(req.user.id);
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
}
