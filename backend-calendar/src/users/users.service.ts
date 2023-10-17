import {
  BadRequestException,
  ConflictException,
  Injectable,
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

    const user = await this.usersRepository.create(data);

    if (!user) {
      new ConflictException({ message: 'Email já cadastrado' });
    }

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
