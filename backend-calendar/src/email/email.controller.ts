import { Body, Controller, Post } from '@nestjs/common';
import { ContactEmailDto } from './dto/contact-email.dto';
import { EmailService } from './email.service';
import { Public } from 'src/constants';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Public()
  @Post('contact')
  contact(@Body() data: ContactEmailDto) {
    console.log(data);
    return this.emailService.contact(data);
  }
}
