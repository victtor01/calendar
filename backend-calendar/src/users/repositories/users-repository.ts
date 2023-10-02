import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract create(data: CreateUserDto): Promise<User>;
    abstract findOne(email: string): Promise<User | undefined>
    abstract findOneByEmail(email: string) : Promise<User | undefined>
    abstract update(userId: number, data: any): Promise<boolean>
}