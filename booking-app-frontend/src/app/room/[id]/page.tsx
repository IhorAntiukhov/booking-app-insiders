import ErrorText from "@/components/ui/error-text";
import BookingList from "@/features/bookings/components/booking-list";
import getRoomById from "@/features/rooms/actions/get-room-by-id";
import EditRoom from "@/features/rooms/components/edit-room";
import NewUserForm from "@/features/rooms/components/new-user-form";
import UserList from "@/features/rooms/components/user-list";

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: RoomPageProps) {
  const { id } = await params;

  const { data, error } = await getRoomById({ id: +id });

  return {
    title: !data || error ? `Error: ${error}` : data.name,
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;

  const { data, error } = await getRoomById({ id: +id });

  const isAdmin = data?.userRole === "admin";

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 p-5">
      {data ? (
        <>
          {isAdmin && (
            <div className="w-full">
              <EditRoom
                id={+id}
                name={data.name}
                description={data.description}
              />
            </div>
          )}

          <div className="w-full">
            <BookingList
              roomId={+id}
              bookings={data?.bookings ?? null}
              isAdmin={isAdmin}
            />
          </div>

          <div className="w-full flex flex-col space-y-5">
            {isAdmin && <NewUserForm roomId={+id} />}

            <UserList
              roomId={+id}
              users={data?.usersInRoom}
              isAdmin={isAdmin}
            />
          </div>
        </>
      ) : (
        <ErrorText>{error.toString()}</ErrorText>
      )}
    </div>
  );
}
