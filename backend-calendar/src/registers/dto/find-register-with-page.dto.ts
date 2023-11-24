import { IsOptional } from "class-validator";

export class FindRegisterWithPageDto{
    userId: number;
    start: number;
    end: number;
}