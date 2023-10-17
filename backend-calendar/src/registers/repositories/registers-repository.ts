import { CreateRegisterDto } from "../dto/create-register.dto";
import { UpdateRegisterDto } from "../dto/update-register.dto";
import { Register } from "../entities/register.entity";

export abstract class RegistersRepository {
    abstract findAll(userId: number): Promise<Register[]>
    abstract findOne(code: string): Promise<Register>
    abstract create(data: CreateRegisterDto): Promise<Register>
    abstract delete(id: number): Promise<any>
    abstract update({id, data}: {id: number, data: UpdateRegisterDto}): Promise<any>
}