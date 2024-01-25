export class User {
  id: number;
  firstName: string;
  key: string;
  lastName: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  cep?: string;
  password: string;
  cpf: string;
  photo?: string;
  phone?: string;
  birth: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'ADMIN' | 'USER';
export type UserStatus = 'CREATED' | 'VERIFIED' | 'APPROVED';
