import { IsNumber } from "class-validator";

export class UserBookingDto {
  @IsNumber()
  bookingId: number;
}
