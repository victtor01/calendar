import { CreateRegisterDto } from "../dto/create-register.dto";
import { Register } from "../entities/register.entity";

export abstract class RegistersRepository {
    abstract findAll(userId: number): Promise<Register[]>
    abstract create(data: CreateRegisterDto): Promise<Register>
}