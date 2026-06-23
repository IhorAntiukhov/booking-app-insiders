import ErrorText from "@/components/ui/error-text";
import getRooms from "../actions/get-rooms";
import RoomItem from "./room-item";
import NoDataText from "@/components/ui/no-data-text";

export default async function RoomGallery() {
  const { data, error } = await getRooms();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {data && data?.length > 0 ? (
        data?.map((room) => (
          <RoomItem
            key={room.id}
            id={room.id}
            name={room.name}
            description={room.description}
            createdAt={room.createdAt}
          />
        ))
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <NoDataText>No rooms yet</NoDataText>
      )}
    </div>
  );
}
