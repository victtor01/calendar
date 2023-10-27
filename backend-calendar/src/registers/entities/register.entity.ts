export type RegisterType = 'INCOME' | 'EXPENSE';

export class Register {
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