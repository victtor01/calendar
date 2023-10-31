export class UpdateConnectManyDto {
  eventId: number;
  connects: Array<{ id: number }>;
  disconnects: Array<{ id: number }>;
}
