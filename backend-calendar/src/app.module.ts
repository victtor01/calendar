import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfirmationCodesModule } from './confirmation-codes/codes-confirmation.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [UsersModule, ConfirmationCodesModule, AuthModule, EmailModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
