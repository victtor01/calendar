import { CreateConfirmationCodesDto } from "../dto/create-confirmation-codes.dto";
import { ConfirmationCodes } from "../entities/confirmation-codes.entity";

export abstract class ConfirmationCodesRepository {
    abstract findOne(code: string) : Promise<ConfirmationCodes>
    abstract create(body: CreateConfirmationCodesDto) : Promise<ConfirmationCodes>
    abstract delete(id: number) : Promise<boolean>
}