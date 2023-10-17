import { type } from "os";

export class User {
  id: number;
  firstName: string;
  key: string;
  lastName: string;
  email: string;
  status: UserStatus;
  role: UserRole
  password: string;
  cpf: string;
  photo?: string;
  phone?: string;
  birth: Date;
  createdAt: Date;
  updateAt: Date;
}

export type UserRole = 'ADMIN' | 'USER'
export type UserStatus = 'CREATED' | 'VERIFIED' | 'APPROVED'