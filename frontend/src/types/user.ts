export interface User {
  id: number;
  firstName: string;
  key: string;
  lastName: string;
  email: string;
  status: UserStatus;
  photo: string;
  password: string;
  role: UserRole;
  repeatPassword: string;
  phone: string;
  birth: Date;
  cpf: string;
}

export type UserRole = "ADMIN" | "USER";
export type UserStatus = "CREATED" | "VERIFIED" | "APPROVED";
