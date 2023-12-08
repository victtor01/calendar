import { Event } from "./events";

export interface Clients {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    cpf?: string;
    cep?: string;
    color?: string;
    phone?: string;
    street?: string;
    birth?: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    events?: Event[]
  }
  