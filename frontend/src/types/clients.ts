export interface Clients {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    cpf?: string;
    cep?: string;
    color?: string;
    phone?: string;
    street?: string;
    birth?: Date;
    createAt: Date;
    updateAt: Date;
    userId: number;
  }
  