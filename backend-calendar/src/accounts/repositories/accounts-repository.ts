import { CreateAccountsDto } from "../dto/create-accounts.dto";
import { Accounts } from "../entities/accounts.entity";

export abstract class AccountsRepository {
    abstract findAll(userId: number): Promise<Accounts[]>
    abstract create(data: CreateAccountsDto): Promise<Accounts>
}