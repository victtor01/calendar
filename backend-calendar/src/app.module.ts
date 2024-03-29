import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfirmationCodesModule } from './confirmation-codes/codes-confirmation.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AccountsModule } from './accounts/accounts.module';
import { RegistersModule } from './registers/registers.module';
import { ClientsModule } from './clients/clients.module';
import { EventsTemplatesModule } from './events-templates/events-templates.module';
import { EventsModule } from './events/events.module';
import { EventsCommentsModule } from './events-comments/events-comments.module';
import { ServicesModule } from './services/services.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    UsersModule,
    ConfirmationCodesModule,
    AuthModule,
    EmailModule,
    AccountsModule,
    RegistersModule,
    ClientsModule,
    EventsTemplatesModule,
    EventsModule,
    EventsCommentsModule,
    ServicesModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000 * 10, //10 secounds
        limit: 100, //limit requests
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
