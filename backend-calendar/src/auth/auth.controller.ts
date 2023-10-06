import { Body, Controller, HttpStatus, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';
import { confirmEmailDto } from './dto/confirm-email.dto';
import { ConfirmationCodes } from 'src/confirmation-codes/entities/confirmation-codes.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async sign(@Body() { email, password }) {
    return await this.authService.signIn(email, password);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() body: any) {
    const res = await this.authService.reauthenticate(body);
    return res;
  }

  @Public()
  @Post('confirm-email')
  async confirmEmail(@Body() Body: confirmEmailDto) {
    const { userId, code } = Body;
    console.log(userId, code);
    return await this.authService.confirmEmail(Number(userId), code);
  }

  @Public()
  @Post('create-send-code')
  async create(@Body() body: { userId: number }): Promise<string | undefined> {
    return this.authService.createSendCode(body.userId);
  }
}
