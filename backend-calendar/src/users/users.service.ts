import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { ConfirmationCodesService } from 'src/confirmation-codes/confirmation-codes.service';
import { UsersRepository } from './repositories/users-repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    private readonly confirmationCodesService: ConfirmationCodesService,
    private readonly usersRepository: UsersRepository,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  async createNameFile(originalname: string) {
    return `${randomUUID()}${originalname} ${new Date().getTime()}`;
  }

  async create(data: CreateUserDto): Promise<Omit<User, 'password' | 'cpf'>> {
    data.birth = new Date('2004/08/08');
    data.password = await this.hashPassword(data.password);

    if(!data.email) {
      new InternalServerErrorException({
        message: 'Email não informado!'
      })
    }

    //search user of email
    const exists = await this.usersRepository.findOneByEmail(data.email);

    if(!!exists?.email) {
      new InternalServerErrorException({
        message: 'Email já cadastrado!'
      })
    }

    const user = await this.usersRepository.create(data);

    if (!user.id || !user.email) {
      new ConflictException({ message: 'Houve um erro Ao tentar registrar' });
    }

    console.log(user);
    const { id, email }: User = user;
    const { code } = await this.confirmationCodesService.create(id);

    this.emailService.sendEmail({
      to: email,
      text: code,
    });

    const { password, cpf, ...rest } = user;
    return rest;
  }

  async findOne(userId: number) {
    return await this.usersRepository.findOne(userId);
  }

  async updateStatus(data: { user: User; userId: number; status: string }) {
    const { user, userId, status } = data;
    if (user.role !== 'ADMIN') {
      return new UnauthorizedException({
        message: 'Você não tem permisão para fazer isso!',
      });
    }
    console.log('teste')
    const res = await this.usersRepository.update(userId, { status });
    console.log(res)
    return res;
  }

  async findAll(userId: number): Promise<User[] | UnauthorizedException> {
    userId = typeof userId === 'number' ? userId : Number(userId);
    const user = await this.usersRepository.findOne(userId);

    if (user.role === 'USER') {
      return new UnauthorizedException({
        message: 'Você não tem poderes para fazer essa requisição!',
      });
    }

    return await this.usersRepository.findAll();
  }
}
