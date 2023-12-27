import { CreateAccountsDto } from '../dto/create-accounts.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Accounts } from '../entities/accounts.entity';

export abstract class AccountsRepository {
  abstract findAll(userId: number): Promise<Accounts[]>;
  abstract create(data: CreateAccountsDto): Promise<Accounts>;
  abstract findByCode(data: {
    userId: number;
    code: string;
  }): Promise<Accounts>;
  abstract update(data: UpdateAccountDto): Promise<any>;
}
