import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { RoomService } from "./room.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { JwtGuard } from "src/auth/guards/auth.guard";
import type { Request } from "express";
import JwtPayload from "src/auth/types/jwtPayload.type";
import { IsInRoom } from "./guards/isInRoom.guard";
import { IsAdmin } from "./guards/isAdmin.guard";
import { AddUserToRoomDto } from "./dto/add-user-to-room.dto";
import { DeleteUserFromRoomDto } from "./dto/delete-user-from-room.dto";

@UseGuards(JwtGuard)
@Controller("rooms")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll(@Req() request: Request & { user: JwtPayload }) {
    console.log(request.user);
    return this.roomService.findAll(request.user);
  }

  @UseGuards(IsInRoom)
  @Get(":id")
  findOne(
    @Param("id") id: string,
    @Req() request: Request & { user: JwtPayload },
  ) {
    return this.roomService.findOne(+id, request.user);
  }

  @Post()
  create(
    @Body() body: CreateRoomDto,
    @Req() request: Request & { user: JwtPayload },
  ) {
    return this.roomService.create(body, request.user);
  }

  @Post("/usersInRoom")
  addUser(@Body() body: AddUserToRoomDto) {
    return this.roomService.addUserToRoom(body);
  }

  @Delete("/usersInRoom")
  deleteUser(@Body() body: DeleteUserFromRoomDto) {
    return this.roomService.deleteUserFromRoom(body);
  }

  @UseGuards(IsAdmin)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UpdateRoomDto) {
    return this.roomService.update(+id, body);
  }

  @UseGuards(IsAdmin)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomService.remove(+id);
  }
}
