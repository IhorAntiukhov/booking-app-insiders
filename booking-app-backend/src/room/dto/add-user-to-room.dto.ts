import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { Role } from "generated/prisma/enums";

export class AddUserToRoomDto {
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsNumber()
  roomId: number;
}
