import { Register } from "src/registers/entities/register.entity";

export class Accounts {
  id: number;
  code: string;
  name: string;
  description: string;
  userId: number;
  registers?: Register[];
}
