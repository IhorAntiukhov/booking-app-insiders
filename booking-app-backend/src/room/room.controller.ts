import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from "@nestjs/common";
import { RoomService } from "./room.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { JwtGuard } from "src/auth/guards/auth.guard";
import { InRoom } from "./guards/in-room.guard";
import { Admin } from "./guards/admin.guard";
import { AddUserToRoomDto } from "./dto/add-user-to-room.dto";
import { DeleteUserFromRoomDto } from "./dto/delete-user-from-room.dto";
import type RequestWithUser from "src/common/types/request-with-user.type";

@UseGuards(JwtGuard)
@Controller("rooms")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll(@Req() request: RequestWithUser) {
    return this.roomService.findAll(request.user);
  }

  @UseGuards(InRoom)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() request: RequestWithUser) {
    return this.roomService.findOne(+id, request.user);
  }

  @Post()
  create(@Body() body: CreateRoomDto, @Req() request: RequestWithUser) {
    return this.roomService.create(body, request.user);
  }

  @UseGuards(Admin)
  @Put(":id")
  update(@Param("id") id: string, @Body() body: CreateRoomDto) {
    return this.roomService.update(+id, body);
  }

  @UseGuards(Admin)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomService.remove(+id);
  }

  @UseGuards(Admin)
  @Post("/usersInRoom")
  addUser(@Body() body: AddUserToRoomDto) {
    return this.roomService.addUserToRoom(body);
  }

  @UseGuards(Admin)
  @Delete("/usersInRoom")
  deleteUser(@Body() body: DeleteUserFromRoomDto) {
    return this.roomService.deleteUserFromRoom(body);
  }
}
