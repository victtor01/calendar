import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ContactEmailDto {
  @IsEmail({}, { message: 'Email inválido!' })
  @IsNotEmpty({ message: 'Campo email vazio!' })
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
