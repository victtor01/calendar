import { Body, Controller, Post } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { RegistersService } from './registers.service';

@Controller('registers')
export class RegistersController {
    constructor(private readonly registerService: RegistersService) {}

    @Post('create')
    async create(@Body() data: CreateRegisterDto) {
        data.type.toLocaleUpperCase();
        delete data.date;

        return await  this.registerService.create(data);
    }
}
