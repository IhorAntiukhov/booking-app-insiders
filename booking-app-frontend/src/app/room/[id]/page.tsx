import BookingList from "@/features/bookings/components/booking-list";
import getRoomById from "@/features/rooms/actions/getRoomById";
import EditRoom from "@/features/rooms/components/edit-room";
import UserList from "@/features/rooms/components/user-list";

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;

  const { data, error } = await getRoomById(+id);

  const isAdmin = data?.userRole === "admin";

  return (
    <div className="flex flex-wrap gap-7 p-5">
      {data ? (
        <>
          {isAdmin && (
            <EditRoom
              id={+id}
              name={data.name}
              description={data.description}
            />
          )}

          <BookingList
            roomId={+id}
            bookings={data?.bookings ?? null}
            isAdmin={isAdmin}
          />

          <UserList roomId={+id} users={data?.usersInRoom} isAdmin={isAdmin} />
        </>
      ) : (
        <p>{error.toString()}</p>
      )}
    </div>
  );
}
