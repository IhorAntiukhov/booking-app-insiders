import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import type { Request } from "express";
import { UserBookingDto } from "src/booking/dto/user-booking.dto";
import User from "src/common/types/user.type";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class InRoom implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    let roomId: number | null = +request.params.id;
    const user = request.user as User;

    if (
      context.getClass().name === "BookingController" &&
      (context.getHandler().name === "signUpForMeeting" ||
        context.getHandler().name === "cancelBooking")
    ) {
      const userBooking = await this.prismaService.booking.findUnique({
        where: {
          id:
            context.getHandler().name === "signUpForMeeting"
              ? (request.body as UserBookingDto).bookingId
              : +request.params.id,
        },
        select: {
          roomId: true,
        },
      });

      roomId = userBooking?.roomId || null;
    }

    if (roomId === null) return false;

    const userInRoom = await this.prismaService.userRoom.findUnique({
      where: {
        userId_roomId: {
          roomId,
          userId: user.id,
        },
      },
    });

    return !!userInRoom;
  }
}
