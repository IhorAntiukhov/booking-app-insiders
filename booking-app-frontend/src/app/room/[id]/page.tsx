import BookingList from "@/features/bookings/components/booking-list";
import getRoomById from "@/features/rooms/actions/getRoomById";
import EditRoom from "@/features/rooms/components/edit-room";

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;

  const { data, error } = await getRoomById(+id);

  return (
    <div className="flex flex-wrap gap-5 p-5">
      {data ? (
        <EditRoom id={+id} name={data.name} description={data.description} />
      ) : (
        <p>{error.toString()}</p>
      )}

      <BookingList
        bookings={data?.bookings ?? null}
        isAdmin={data?.userRole === "admin"}
      />
    </div>
  );
}
