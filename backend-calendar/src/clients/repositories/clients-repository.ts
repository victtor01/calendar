import { CreateClientsDto } from "../dto/create-clients.dto";
import { DeleteClientsDto } from "../dto/delete-clients.dto";
import { Clients } from "../entities/clients.entity";

export abstract class ClientsRepository {
    abstract findAll(userId: number): Promise<Clients[]>
    abstract create(data: CreateClientsDto): Promise<Clients>
    abstract delete({userId, id}: DeleteClientsDto): Promise<boolean>
}