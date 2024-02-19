import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { ConfirmationCodesService } from 'src/confirmation-codes/confirmation-codes.service';
import { UsersRepository } from './repositories/users-repository';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { SendEmailRedefinePasswordDto } from './dto/send-email-redefine-password';
import { differenceInMinutes } from 'date-fns';
import { RedefinePasswordDto } from './dto/redefine-password.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/auth/constants';
import { ConfirmationCodes } from 'src/confirmation-codes/entities/confirmation-codes.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    private readonly confirmationCodesService: ConfirmationCodesService,
    private readonly usersRepository: UsersRepository,
  ) {}

  private readonly salt = 10;

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt);
  }

  async sendEmailForRedefinePassword(data: SendEmailRedefinePasswordDto) {
    const { email } = data;
    // get user

    const userExists = await this.usersRepository.findOneByEmail(email);

    // if user not exists

    if (!userExists?.id) {
      return new NotFoundException({
        message: 'Usuário não encontrado!',
      });
    }

    const codeExists = await this.confirmationCodesService.findByUserId(
      userExists.id,
    );

    // if exists code

    if (codeExists?.id) {
      // verify hour
       const diffInMinutes = differenceInMinutes(
        new Date(),
        new Date(codeExists.createdAt),
      );

      // if the difference is greater than 5 minutes
      
      if (diffInMinutes < 5) {
        return new BadRequestException({
          message: 'Espere um pouco antes de pedir o código novamente!',
        });
      }

      const deleted = await this.confirmationCodesService.delete(
        +codeExists.id,
      );

      if (!deleted) {
        return new InternalServerErrorException({
          message: 'Houve um erro no servidor, entre em contato com o suporte!',
        });
      }

      // create and sendEmail

      const { code } = await this.confirmationCodesService.createCustomize({
        userId: +userExists.id,
        code: uuidv4(),
      });

      const sendEmail: boolean = await this.emailService.sendEmail({
        to: userExists.email,
        subject: 'Código de confirmação.',
        html: `
        <p>Olá,</p>
        <p>Para redefinir sua senha, clique no link abaixo:</p>
        <a href="https://calendar-frontend-two.vercel.app/redefine-password/${code}">redefinir senha</a>
      `,
      });

      return {
        message: 'Código enviado para o email!',
        error: false,
      };
    }

    // create code

    const createdCode: ConfirmationCodes =
      await this.confirmationCodesService.createCustomize({
        userId: +userExists.id,
        code: uuidv4(),
      });

    if (!createdCode?.code) {
      return new InternalServerErrorException({
        message: 'houve um erro ao tentar enviar o código!',
      });
    }

    const sendEmail: boolean = await this.emailService.sendEmail({
      to: userExists.email,
      subject: 'Código de confirmação.',
      text: `
      ${createdCode.code.toString()}
      `,
    });

    return {
      error: false,
      message: 'Email enviado com sucesso!',
    };
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

    if (exists?.email === createData.email) {
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

    if (!user.id) {
      return new ConflictException({
        message: 'Houve um erro Ao tentar registrar',
      });
    }

    const { id, email }: { id: number; email: string } = user;

    const { code }: { code: string } =
      await this.confirmationCodesService.create(id);

    try {
      await this.emailService.sendEmail({
        to: email,
        text: code,
      });

      const { password, cpf, ...rest } = user;

      return rest;
    } catch (error) {
      return new BadRequestException({
        message: 'Falha ao enviar email!',
      });
    }
  }

  async redefinePassowrd(data: RedefinePasswordDto) {
    const { email, code, password, repeatPassword } = data;

    const userExists = await this.usersRepository.findOneByEmail(email);

    if (!userExists.id) {
      return new BadRequestException({
        message: 'Usuário não existe!',
      });
    }

    const codeExists = await this.confirmationCodesService.findByUserId(
      +userExists.id,
    );

    if (!codeExists.code || code !== codeExists.code) {
      return new BadRequestException({
        message: 'Código incorreto!',
      });
    }

    if (password !== repeatPassword) {
      return new BadGatewayException({
        message: 'Senha não coecidem!',
      });
    }

    const hash = await this.hashPassword(data.password);

    return await this.usersRepository.update(+userExists.id, {
      password: hash,
    });

    // if userExists and code confirm
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

    const res = await this.usersRepository.update(userId, { status });

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
