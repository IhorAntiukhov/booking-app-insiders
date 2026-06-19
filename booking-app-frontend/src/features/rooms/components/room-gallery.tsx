import getRooms from "../actions/getRooms";
import RoomItem from "./room-item";

export default async function RoomGallery() {
  const { data, error } = await getRooms();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data && data?.length > 0 ? (
        data?.map((room) => (
          <RoomItem
            key={room.id}
            id={room.id}
            name={room.name}
            description={room.description}
          />
        ))
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No rooms yet</p>
      )}
    </div>
  );
}
