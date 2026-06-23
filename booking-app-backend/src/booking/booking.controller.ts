import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { JwtGuard } from "src/auth/guards/auth.guard";
import { UserBookingDto } from "./dto/user-booking.dto";
import type RequestWithUser from "src/common/types/request-with-user.type";
import { Admin } from "src/room/guards/admin.guard";
import { InRoom } from "src/room/guards/in-room.guard";
import { PrismaService } from "src/prisma/prisma.service";

@UseGuards(JwtGuard)
@Controller("bookings")
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(Admin)
  @Post()
  create(@Body() body: CreateBookingDto) {
    return this.bookingService.create(body);
  }

  @UseGuards(InRoom)
  @Post("sign-up")
  signUpForMeeting(
    @Body() body: UserBookingDto,
    @Req() request: RequestWithUser,
  ) {
    return this.bookingService.signUpForMeeting(body, request.user);
  }

  @UseGuards(InRoom)
  @Delete("sign-up/:id")
  cancelBooking(@Param("id") id: string, @Req() request: RequestWithUser) {
    return this.bookingService.cancelBooking(+id, request.user);
  }

  @UseGuards(Admin)
  @Put(":id")
  update(@Param("id") id: string, @Body() body: CreateBookingDto) {
    return this.bookingService.update(+id, body);
  }

  @UseGuards(Admin)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookingService.remove(+id);
  }
}
