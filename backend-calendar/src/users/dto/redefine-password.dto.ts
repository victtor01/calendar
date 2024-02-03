import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RedefinePasswordDto {
  @IsEmail({}, { message: 'Campo email inválido!' })
  @IsNotEmpty({ message: 'Campo email é obrigatório!' })
  email: string;

  @IsNotEmpty({ message: 'Campo Código é obrigatório!' })
  @IsString({ message: 'Campo código inválido!' })
  code: string;

  @IsString({ message: 'Campo código inválido!' })
  @IsNotEmpty({ message: 'Campo Código é obrigatório!' })
  password: string;

  @IsString({ message: 'Campo código inválido!' })
  @IsNotEmpty({ message: 'Campo repetir senha é obrigatório!' })
  repeatPassword: string;
}
