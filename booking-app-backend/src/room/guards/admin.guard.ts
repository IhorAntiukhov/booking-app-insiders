import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import type { Request } from "express";
import User from "src/common/types/user.type";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class Admin implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    let roomId: number | null =
      +(request.body as { roomId: string })?.roomId || +request.params.id;
    const user = request.user as User;

    if (
      context.getClass().name === "BookingController" &&
      context.getHandler().name === "remove"
    ) {
      const userBooking = await this.prismaService.booking.findUnique({
        where: {
          id: +request.params.id,
          room: {
            usersInRoom: {
              some: {
                userId: user.id,
              },
            },
          },
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
          userId: user.id,
          roomId,
        },
      },
    });

    return !!userInRoom && userInRoom.role === "admin";
  }
}
