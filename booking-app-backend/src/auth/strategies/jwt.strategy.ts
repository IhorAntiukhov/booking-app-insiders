import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";
import JwtPayload from "../types/jwtPayload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (request && request.cookies) {
            return request.cookies["access_token"] as string;
          }

          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: JwtPayload) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!existingUser) {
      throw new UnauthorizedException("A user was not found");
    }

    return {
      id: existingUser.id,
      email: existingUser.email,
    };
  }
}
