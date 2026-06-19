import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserBookingDto } from "./dto/user-booking.dto";
import JwtPayload from "src/auth/types/jwtPayload.type";

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ description, startDate, endDate, roomId }: CreateBookingDto) {
    await this.validateBooking(startDate, endDate, roomId);

    await this.prismaService.booking.create({
      data: { description, startDate, endDate, roomId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  async update(
    id: number,
    { description, startDate, endDate, roomId }: UpdateBookingDto,
  ) {
    await this.validateBooking(startDate, endDate, roomId);

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

  async signUpForMeeting({ bookingId }: UserBookingDto, user: JwtPayload) {
    await this.prismaService.userBooking.create({
      data: { bookingId, userId: user.id },
    });
  }

  private async validateBooking(
    startDate: string,
    endDate: string,
    roomId: number,
  ) {
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();

    if (startTime >= endTime) {
      throw new BadRequestException("Start date must be smaller than end date");
    }

    const bookingsForRoom = await this.prismaService.booking.findMany({
      where: { roomId },
    });

    const hasOverlap = bookingsForRoom.some((booking) => {
      const existingStart = new Date(booking.startDate).getTime();
      const existingEnd = new Date(booking.endDate).getTime();

      return existingStart < endTime && existingEnd > startTime;
    });

    if (hasOverlap) {
      throw new ConflictException("There is already a booking for this time");
    }
  }
}
