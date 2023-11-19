export interface Register {
  id: number;
  code: string;
  name: string;
  description: string;
  value: number;
  type: RegisterType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  accountId: number;
}

export type RegisterType = "INCOME" | "EXPENSE";
