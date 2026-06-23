import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserBookingDto } from "./dto/user-booking.dto";
import User from "src/common/types/user.type";

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ description, startDate, endDate, roomId }: CreateBookingDto) {
    await this.validateBooking(startDate, endDate, roomId);

    await this.prismaService.booking.create({
      data: { description, startDate, endDate, roomId },
    });
  }

  async update(
    id: number,
    { description, startDate, endDate, roomId }: CreateBookingDto,
  ) {
    await this.validateBooking(startDate, endDate, roomId, id);

    await this.prismaService.booking.update({
      where: {
        id,
      },
      data: { description, startDate, endDate, roomId },
    });
  }

  async remove(id: number) {
    await this.prismaService.booking.delete({
      where: {
        id,
      },
    });
  }

  async signUpForMeeting({ bookingId }: UserBookingDto, user: User) {
    await this.prismaService.userBooking.create({
      data: { bookingId, userId: user.id },
    });
  }

  async cancelBooking(id: number, user: User) {
    await this.prismaService.userBooking.delete({
      where: {
        userId_bookingId: {
          bookingId: id,
          userId: user.id,
        },
      },
    });
  }

  private async validateBooking(
    startDate: string,
    endDate: string,
    roomId: number,
    bookingId?: number,
  ) {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    if (new Date().getTime() >= startTimestamp) {
      throw new BadRequestException("You cannot create bookings for the past");
    }

    if (startTimestamp >= endTimestamp) {
      throw new BadRequestException("Start date must be smaller than end date");
    }

    const bookingsForRoom = await this.prismaService.booking.findFirst({
      where: {
        id: {
          not: bookingId,
        },
        roomId,
        startDate: {
          lt: endDate,
        },
        endDate: {
          gt: startDate,
        },
      },
    });

    if (bookingsForRoom) {
      throw new ConflictException("There is already a booking for this time");
    }
  }
}
