import Role from "@/types/role";

interface FullRoomItem {
  name: string;
  description: string;
  bookings: {
    id: number;
    description: string;
    startDate: string;
    endDate: string;
    usersInBooking: {
      user: {
        id: string;
        name: string;
        email: string;
      };
    }[];
  }[];
  usersInRoom: {
    role: Role;
    user: {
      name: string;
      id: string;
      email: string;
    };
  }[];
  userRole: Role;
}

export default FullRoomItem;
