export class UpdateClientDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cpf?: string;
    cep?: string;
    phone?: string;
    street?: string;
    photo?: string;
    birth?: Date;
}