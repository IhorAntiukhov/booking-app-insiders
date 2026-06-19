import Role from "@/types/role";

interface UserItemDto {
  email: string;
  role: Role;
  roomId: number;
}

export default UserItemDto;
