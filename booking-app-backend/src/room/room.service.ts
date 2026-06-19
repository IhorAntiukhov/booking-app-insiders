import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { PrismaService } from "src/prisma/prisma.service";
import JwtPayload from "src/auth/types/jwtPayload.type";

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(user: JwtPayload) {
    return await this.prismaService.room.findMany({
      where: {
        usersInRoom: {
          some: {
            userId: user.id,
          },
        },
      },
    });
  }

  async findOne(id: number, user: JwtPayload) {
    const roomData = await this.prismaService.room.findFirst({
      where: {
        usersInRoom: {
          some: {
            userId: user.id,
          },
        },
      },
      select: {
        name: true,
        description: true,
        bookings: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
          },
        },
        usersInRoom: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            role: true,
          },
        },
      },
    });

    if (roomData) {
      return {
        ...roomData,
        userRole:
          roomData.usersInRoom.findIndex(
            (userInRoom) =>
              userInRoom.role === "admin" && userInRoom.user.id === user.id,
          ) !== -1
            ? "admin"
            : "user",
      };
    }

    return null;
  }

  async create({ name, description }: CreateRoomDto, user: JwtPayload) {
    const newRoom = await this.prismaService.room.create({
      data: {
        name,
        description,
      },
    });

    await this.prismaService.userRoom.create({
      data: {
        userId: user.id,
        roomId: newRoom.id,
        role: "admin",
      },
    });
  }

  async update(id: number, data: UpdateRoomDto) {
    await this.prismaService.room.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.room.delete({
      where: {
        id,
      },
    });
  }
}
