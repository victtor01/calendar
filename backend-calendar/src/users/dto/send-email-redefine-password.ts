import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailRedefinePasswordDto {
  @IsEmail({}, { message: 'Email inválido!' })
  @IsNotEmpty({ message: 'Campo email vazio!' })
  email: string;
}
