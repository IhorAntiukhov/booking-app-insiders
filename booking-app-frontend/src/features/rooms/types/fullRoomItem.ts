import Role from "@/types/role";

interface FullRoomItem {
  name: string;
  description: string;
  bookings: {
    id: number;
    startDate: string;
    endDate: string;
  }[];
  usersInRoom: {
    role: Role;
    user: {
      name: string;
      id: string;
      email: string;
    };
  }[];
}

export default FullRoomItem;
