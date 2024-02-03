import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetTop10ClientsDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  userId: number;
}
