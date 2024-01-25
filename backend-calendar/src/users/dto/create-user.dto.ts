import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  isEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome inválido!' })
  @IsNotEmpty({ message: 'Campo Nome faltando! ' })
  firstName: string;

  @IsString({ message: 'Sobrenome inválido!' })
  @IsNotEmpty({ message: 'Campo sobrenome faltando!' })
  @MaxLength(20)
  lastName: string;

  @IsNotEmpty({ message: 'Campo email faltando!' })
  @IsEmail({}, { message: 'Email inválido!' })
  @Transform(({ value }: { value: string }) => value.toLocaleLowerCase())
  email: string;

  @IsNotEmpty({ message: 'Campo senha faltando!' })
  password: string;

  @IsNotEmpty({ message: 'Campo senha faltando!' })
  repeatPassword: string;

  @IsNotEmpty({ message: 'Campo Aniversário faltando!' })
  @IsDateString()
  birth: Date;

  @IsString()
  @Length(11, 11, { message: 'Forma incorreta do CPF!' })
  cpf: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  cep?: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'Telefone inválido inválido!' })
  phone?: string;
}
