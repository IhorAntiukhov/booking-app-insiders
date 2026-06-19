import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import type { Request } from "express";
import JwtPayload from "src/auth/types/jwtPayload.type";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class IsAdmin implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const roomId = +request.params.id;
    const user = request.user as JwtPayload;

    const isUserAdmin = await this.prismaService.userRoom.findFirst({
      where: {
        roomId,
        userId: user.id,
        role: "admin",
      },
    });

    return !!isUserAdmin;
  }
}
