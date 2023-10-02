export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birth: Date;
  cpf: string;
  photo?: string;
  phone?: string;
}
