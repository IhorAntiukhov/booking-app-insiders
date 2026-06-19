import {
  Controller,
  Get,
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
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { JwtGuard } from "src/auth/guards/auth.guard";
import { IsAdmin } from "src/room/guards/isAdmin.guard";
import type { Request } from "express";
import { UserBookingDto } from "./dto/user-booking.dto";
import JwtPayload from "src/auth/types/jwtPayload.type";

@UseGuards(JwtGuard)
@Controller("bookings")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(IsAdmin)
  @Post()
  create(@Body() body: CreateBookingDto) {
    return this.bookingService.create(body);
  }

  @Post("sign-up")
  signUpForMeeting(
    @Body() body: UserBookingDto,
    @Req() request: Request & { user: JwtPayload },
  ) {
    return this.bookingService.signUpForMeeting(body, request.user);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookingService.findOne(+id);
  }

  @UseGuards(IsAdmin)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @UseGuards(IsAdmin)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookingService.remove(+id);
  }
}
