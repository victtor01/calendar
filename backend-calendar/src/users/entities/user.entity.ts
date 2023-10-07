export class User {
  id: number;
  firstName: string;
  key: string;
  lastName: string;
  email: string;
  status: UserStatus;
  password: string;
  cpf: string;
  photo?: string;
  phone?: string;
  birth: Date;
  createdAt: Date;
  updateAt: Date;
}

export type UserStatus = 'CREATED' | 'VERIFIED' | 'APPROVED'