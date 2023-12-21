import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfirmationCodesModule } from 'src/confirmation-codes/codes-confirmation.module';
import { EmailService } from 'src/email/email.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    ConfirmationCodesModule,
    JwtModule.register({
      global: true,
      secret: 'EXEMPLE',
      signOptions: { expiresIn: jwtConstants.expiration },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}
