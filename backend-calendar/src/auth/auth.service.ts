import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories/users-repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfirmationCodesRepository } from 'src/confirmation-codes/repositories/codes-confirmation-repository';
import { EmailService } from 'src/email/email.service';
import { ConfirmationCodesService } from 'src/confirmation-codes/confirmation-codes.service';
import { ConfirmationCodes } from 'src/confirmation-codes/entities/confirmation-codes.entity';
import { differenceInMinutes } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private UsersRepository: UsersRepository,
    private jwtService: JwtService,
    private confirmatinCodesRepository: ConfirmationCodesRepository,
    private confirmationCodesService: ConfirmationCodesService,
    private emailService: EmailService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new UnauthorizedException({
        message: 'Houve um erro! Campos email ou senha faltando!',
      });
    }

    // get user exists

    const user = await this.UsersRepository.findOneByEmail(email);

    // verify user

    if (!user?.id) {
      throw new UnauthorizedException({
        message: 'Usuário não encontrado!',
      });
    }

    // compare password

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException({
        message: 'As senhas não coecidem!',
      });
    }

    // if user id verified

    if (user.status === 'APPROVED') {
      const access_token = await this.jwtService.signAsync(user, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expiration,
      });

      const refresh_token = await this.jwtService.signAsync(user, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.refreshExpiration,
      });

      const { password, cpf, id, ...rest } = user;
      return {
        access_token,
        refresh_token,
        user: rest,
      };
    }

    const { key: userKey, status } = user;

    if (status === 'VERIFIED') {
      return {
        status,
        userKey,
      };
    }

    // if not approved | get code of user

    const codeExists = await this.confirmationCodesService.findByUserId(
      +user.id,
    );

    // if user status is created and code confirmation not exists

    if (status === 'CREATED' && !codeExists.id) {
      const { code } = await this.confirmationCodesService.create(user.id);

      this.emailService.sendEmail({
        to: user.email,
        text: code,
      });
    }

    // validate createad

    const diffInMinutes = differenceInMinutes(
      new Date(),
      new Date(codeExists.createdAt),
    );

    // if the difference is greater than 5 minutes

    if (diffInMinutes < 5) {
      return {
        code: codeExists.code,
      };
    }

    const deleted = await this.confirmationCodesService.delete(codeExists.id);

    if (!deleted) {
      return new InternalServerErrorException({
        message: 'Houve um erro no servidor, entre em contato com o suporte!',
      });
    }

    // create and sendEmail

    const { code } = await this.confirmationCodesService.create(user.id);

    const sendEmail: boolean = await this.emailService.sendEmail({
      to: user.email,
      subject: 'Código de confirmação.',
      text: code.toString(),
    });

    return {
      code: code,
    };
  }

  async reauthenticate(body: any) {
    const payload = await this.verifyRefreshToken(body);

    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiration,
    });

    const { refresh_token } = body;

    return {
      access_token,
      refresh_token,
    };
  }

  async confirmEmail(
    userId: number,
    codeConfirm: string,
  ): Promise<boolean | BadRequestException> {
    try {
      const { id: codeId, code } =
        await this.confirmatinCodesRepository.findOne(codeConfirm);

      if (!codeId) {
        return false;
      }

      if (codeConfirm !== code) {
        return new BadRequestException({
          message: 'Os códigos não coecidem!',
        });
      }

      const updated = await this.UsersRepository.update(userId, {
        status: 'VERIFIED',
      });

      if (!updated) {
        return false;
      }

      this.confirmatinCodesRepository.delete(codeId);

      return true;
    } catch (error) {
      console.log(error);
      return new BadRequestException({
        message: 'Houve um erro na validação!',
      });
    }
  }

  async createSendCode(userId: number): Promise<string> {
    console.log(userId);
    const { email } = await this.UsersRepository.findOne(userId);
    const { code } = await this.confirmationCodesService.create(userId);
    this.emailService.sendEmail({
      to: email,
      text: code,
    });
    return code;
  }

  private async verifyRefreshToken(body): Promise<User | undefined> {
    const refreshToken = body.refresh_token || null;

    if (!refreshToken) {
      throw new NotFoundException('Token de refresh não encontrado');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const user = await this.UsersRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      await this.jwtService.verify(refreshToken, {
        secret: jwtConstants.secret,
      });

      return user;
    
    } catch (err) {

      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }

      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      
      throw new UnauthorizedException(err.name);
    }
  }
}
