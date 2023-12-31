import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(
    @Body() createServiceDto: CreateServiceDto,
    @Request() req: { user: User },
  ) {
    return this.servicesService.create({
      data: createServiceDto,
      userId: Number(req.user.id),
    });
  }

  @Get()
  findAll(@Request() req: { user: User }) {
    return this.servicesService.findAll(+req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Get('/find-by-code/:code')
  findByCode(@Param('code') code: string, @Request() req: { user: User }) {
    return this.servicesService.findOneByCode({
      userId: +req.user.id,
      code,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: User }) {
    const userId = req.user.id;
    return this.servicesService.delete({
      id: +id,
      userId: +userId,
    });
  }
}
