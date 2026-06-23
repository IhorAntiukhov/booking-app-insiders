"use client";

import FullRoomItem from "@/features/rooms/types/full-room-item";
import UserItem from "./user-item";
import NoDataText from "@/components/ui/no-data-text";

interface BookingListProps {
  roomId: number;
  isAdmin: boolean;
  users: FullRoomItem["usersInRoom"] | null;
}

export default function UserList({ roomId, users, isAdmin }: BookingListProps) {
  return (
    <div className="flex flex-col space-y-3">
      {!!users && users.length > 0 ? (
        users.map(({ role, user: { name, id, email } }) => (
          <UserItem
            key={id}
            id={id}
            role={role}
            name={name}
            email={email}
            isAdmin={isAdmin}
            roomId={roomId}
          />
        ))
      ) : (
        <NoDataText>No bookings yet</NoDataText>
      )}
    </div>
  );
}
