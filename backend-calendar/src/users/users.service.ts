import {
  BadGatewayException,
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
import { plainToClass } from 'class-transformer';

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

  async create(
    data: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'cpf'> | BadRequestException> {
    data.birth = new Date(data.birth);
    data.password = await this.hashPassword(data.password);

    const { repeatPassword, ...createData } = data;

    //search user of email
    const exists = await this.usersRepository.findOneByEmailOrPhone(
      data.email,
      data.phone,
    );

    if (exists?.email) {
      return new BadGatewayException({
        message: 'Email já cadastrado!',
      });
    }

    if (exists?.phone === createData?.phone) {
      return new BadRequestException({
        message: 'Telefone já está em uso!',
      });
    }

    const dataSerializer = plainToClass(CreateUserDto, createData);

    const user: User = await this.usersRepository.create(dataSerializer);

    if (!user.id || !user.email) {
      return new ConflictException({
        message: 'Houve um erro Ao tentar registrar',
      });
    }

    const { id, email }: { id: number; email: string } = user;

    const { code }: { code: string } =
      await this.confirmationCodesService.create(id);

    const res = await this.emailService.sendEmail({
      to: email,
      text: code,
    });

    if (!!res) {
      const { password, cpf, ...rest } = user;

      return rest;
    }

    return new BadRequestException({
      message: 'Falha ao enviar email!',
    });
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
    console.log('teste');
    const res = await this.usersRepository.update(userId, { status });
    console.log(res);
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
