import { IsNumber, IsUUID } from "class-validator";

export class DeleteUserFromRoomDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  roomId: number;
}
