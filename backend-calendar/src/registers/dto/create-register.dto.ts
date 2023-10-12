type RegisterType = 'INCOME' | 'EXPENSE';

export class CreateRegisterDto {
  name: string;
  description: string;
  value: number;
  type: RegisterType;
  accountId: number;
  date?: Date;
}
