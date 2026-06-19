import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  description: string;
}
