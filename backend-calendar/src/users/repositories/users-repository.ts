import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract findAll(): Promise<User[] | undefined>
    abstract create(data: CreateUserDto): Promise<User>;
    abstract findOne(id: number):Promise<User | undefined>
    abstract findOneByKey(key: string): Promise<User> 
    abstract findOneByEmail(email: string) : Promise<User>
    abstract update(userId: number, data: any): Promise<boolean>
}