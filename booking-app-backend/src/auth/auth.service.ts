import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto } from "./dto/signUp.dto";
import { hash, verify } from "argon2";
import { SignInDto } from "./dto/signIn.dto";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import isDevEnv from "src/common/isDevEnv.util";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp({ name, email, password }: SignUpDto) {
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException("A user with this email already exists");
    }

    const passwordHash = await hash(password);

    await this.prismaService.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });
  }

  async signIn({ email, password }: SignInDto, response: Response) {
    const existingUser = await this.findUserByEmail(email);

    if (!existingUser) {
      throw new NotFoundException("A user was not found");
    }

    const isPasswordValid = await verify(existingUser.passwordHash, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const accessToken = await this.signAccessToken(
      existingUser.id,
      existingUser.email,
    );

    response.cookie("access_token", accessToken, this.getCookieOptions());
  }

  private async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  private async signAccessToken(id: string, email: string) {
    const payload = {
      id,
      email,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
    });
  }

  private getCookieOptions() {
    return {
      httpOnly: true,
      secure: !isDevEnv(this.configService),
      sameSite: "lax",
      maxAge: this.configService.getOrThrow<number>("ACCESS_TOKEN_MAX_AGE"),
    } as const;
  }
}
