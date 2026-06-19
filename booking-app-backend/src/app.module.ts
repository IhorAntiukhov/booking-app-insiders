import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { RoomModule } from "./room/room.module";
import { BookingModule } from "./booking/booking.module";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RoomModule,
    BookingModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
