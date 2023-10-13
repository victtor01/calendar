import {
  BadRequestException,
  Injectable,
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
        message: 'Houve um erro!',
      });
    }

    const user = await this.UsersRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Usuário não encontrado!',
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException({
        message: 'As senhas não coecidem!',
      });
    }

    if (user?.status.toString() === 'CREATED') {
      const { code } = await this.confirmationCodesService.create(user.id);

      this.emailService.sendEmail({
        to: user.email,
        text: code,
      });

      const { key: userKey, status } = user;

      return {
        status,
        userKey,
      };
    }

    if(user.status.toString() === 'VERIFIED') {
      const { key: userKey, status } = user;

      return {
        status,
        userKey
      }
    }

    const access_token = await this.generateToken(user);

    const refresh_token = await this.jwtService.signAsync(user, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.refreshExpiration,
    });

    return {
      access_token,
      refresh_token,
      user
    };
  }

  async reauthenticate(body: any) {
    const payload = await this.verifyRefreshToken(body);
    const access_token = await this.generateToken(payload);
    const { refresh_token } = body;
    return {
      access_token,
      refresh_token,
    };
  }

  async confirmEmail(userId: number, codeConfirm: string): Promise<boolean | BadRequestException> {
    try {

      const { id: codeId } = await this.confirmatinCodesRepository.findOne(codeConfirm);
      
      if (!codeId) {
        return false;
      }

      const updated = await this.UsersRepository.update(userId, {
        status: 'VERIFIED'
      });

      console.log(updated)

      if (!updated) {
        return false;
      }

      this.confirmatinCodesRepository.delete(codeId);

      return true;
    } catch (error) {
      console.log(error)
      return new BadRequestException({
        message: 'Houve um erro na validação!'
      })
    }
  }

  async createSendCode(userId: number): Promise<string> {
    console.log(userId)
    const { email } = await this.UsersRepository.findOne(userId);
    const { code } = await this.confirmationCodesService.create(userId);
    this.emailService.sendEmail({
      to: email,
      text: code,
    });
    return code;
  }

  private async generateToken(payload: User): Promise<string> {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiration,
    });

    return access_token;
  }

  private async verifyRefreshToken(body): Promise<User | undefined> {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException('Token de refresh não encontrado');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const user = await this.UsersRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
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
