import {
  Controller,
  Post,
  Body,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
  NotFoundException,
  Request,
  HttpStatus,
  HttpCode,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users-repository';
import { Public } from 'src/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private users: UsersRepository,
    private readonly usersService: UsersService,
  ) {}

  @Get('')
  async findAll(@Request() req: any) {
    return await this.usersService.findAll(req.user.id);
  }

  @Get('find')
  async findInfo(@Request() req: any) {
    const { id } = req.user;
    return await this.usersService.findOne(id);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id: number, @Request() req: { user: User }) {
    return await this.usersService.findOne(+id);
  }

  @Patch('update-status/:id')
  async updateStatus(
    @Body() data: { status: string },
    @Request() req: { user: User },
    @Param('id') id: string,
  ) {

    return await this.usersService.updateStatus({
      user: req.user,
      status: data.status,
      userId: +id,
    });
  }

  @Public()
  @Post('register')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueFilename =
            new Date().getTime() + file.originalname.replace(/\s/g, '_');
          cb(null, `${uniqueFilename}`);
        },
      }),
    }),
  )
  async create(
    @Body() data: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    data.photo = photo.filename;
    return this.usersService.create(data);
  }

  @Public()
  @Get('find/:key')
  async findOne(
    @Param('key') userKey: string,
  ): Promise<Omit<User, 'password' | 'cpf'>> {
    const user = await this.users.findOneByKey(userKey);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const { password, cpf, ...userData } = user;
    return userData;
  }

  @Public()
  @Get('find/email/:email')
  async findOneByEmail(
    @Param('email') email: string,
  ): Promise<Omit<User, 'password' | 'cpf'> | NotFoundException> {
    const res = await this.users.findOneByEmail(email);
    if (res.status === 'CREATED') {
      const { password, cpf, ...userData } = res;
      return userData;
    }
    return new NotFoundException({
      message: 'nenhum usuário encontrado!',
    });
  }
}
