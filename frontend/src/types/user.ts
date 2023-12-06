export interface User {
  id: number;
  firstName: string;
  key: string;
  lastName: string;
  email: string;
  status: string;
  photo: string;
  password: string;
  role: UserRole;
  repeatPassword: string;
  phone: string;
  birth: Date;
}

type UserRole = "ADMIN" | "USER";
