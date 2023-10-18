export class CreateClientsDto {
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf?: string;
  cep?: string;
  phone?: string;
  street?: string;
  birth?: Date;
  userId: number;
}
