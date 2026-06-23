import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AddUserToRoomDto } from "./dto/add-user-to-room.dto";
import { DeleteUserFromRoomDto } from "./dto/delete-user-from-room.dto";
import User from "src/common/types/user.type";

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(user: User) {
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

  async findOne(id: number, user: User) {
    const roomData = await this.prismaService.room.findFirst({
      where: {
        id,
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
            description: true,
            startDate: true,
            endDate: true,
            usersInBooking: {
              select: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    name: true,
                  },
                },
              },
            },
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
        bookings: roomData.bookings.map((booking) => ({
          ...booking,
          usersInBooking: booking.usersInBooking.map(
            ({ user: userInRoom }) => ({
              ...userInRoom,
              isOwner: user.id === userInRoom.id,
            }),
          ),
        })),
      };
    }

    return null;
  }

  async create({ name, description }: CreateRoomDto, user: User) {
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

  async addUserToRoom({ email, role, roomId }: AddUserToRoomDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!existingUser) throw new NotFoundException("A user was not found");

    await this.prismaService.userRoom.create({
      data: {
        userId: existingUser.id,
        roomId: roomId,
        role,
      },
    });
  }

  async deleteUserFromRoom({ userId, roomId }: DeleteUserFromRoomDto) {
    await this.prismaService.userRoom.delete({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
    });
  }

  async update(id: number, data: CreateRoomDto) {
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
