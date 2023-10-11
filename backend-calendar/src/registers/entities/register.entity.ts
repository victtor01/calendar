export type RegisterType = 'INCOME' | 'EXPENSE';

export class Register {
    id: number;
    code: string;
    name: string;
    description: string;
    value: number;
    type: RegisterType;
    createAt: Date;
    updateAt: Date;
    accountId: number;
}