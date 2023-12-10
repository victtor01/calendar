import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  Delete,
  Param,
  UploadedFile,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Clients } from './entities/clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientsDto } from './dto/create-clients.dto';
import { User } from 'src/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Get('/find-by-code/:code')
  async findByCode(
    @Param('code') code: string,
    @Request() req: { user: User },
  ) {
    return await this.clientsService.findOneByCode({
      userId: +req.user.id,
      code,
    });
  }

  @Put('update/:id')
  update(@UploadedFile() photo: Express.Multer.File, @Body() body: any) {
    console.log(photo);
    console.log(body);
  }

  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/clients',
        filename: (req, file, cb) => {
          const uniqueFilename =
            new Date().getTime() + file.originalname.replace(/\s/g, '_');
          cb(null, `${uniqueFilename}`);
        },
      }),
    }),
  )
  @Put('update/photo/:id')
  async updatePhoto(
    @UploadedFile() photo: Express.Multer.File,
    @Param('id') id: string,
    @Request() req: { user: User },
  ) {
    return await this.clientsService.updatePhoto({
      userId: +req.user.id,
      photo: photo.filename,
      id: +id,
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
