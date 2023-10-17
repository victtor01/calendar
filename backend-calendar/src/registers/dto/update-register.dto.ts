type RegisterType = 'INCOME' | 'EXPENSE';

export class UpdateRegisterDto {
  name?: string;
  description?: string;
  value?: number;
  type?: RegisterType;
  accountId?: number;
  userId?: number;
  date?: Date;
}
