import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  roomId: number;
}
