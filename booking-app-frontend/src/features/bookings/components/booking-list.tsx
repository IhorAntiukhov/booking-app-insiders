import FullRoomItem from "@/features/rooms/types/fullRoomItem";
import BookingItem from "./booking-item";
import { Button } from "@/components/ui/button";

interface BookingListProps {
  isAdmin: boolean;
  bookings: FullRoomItem["bookings"] | null;
}

export default function BookingList({ bookings, isAdmin }: BookingListProps) {
  return (
    <div className="flex flex-col space-y-5">
      <Button>Create booking</Button>

      <div className="flex flex-col space-y-3">
        {!!bookings && bookings.length > 0 ? (
          bookings.map(({ id, description, startDate, endDate }) => (
            <BookingItem
              key={id}
              id={id}
              description={description}
              startDate={startDate}
              endDate={endDate}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <p>No bookings yet</p>
        )}
      </div>
    </div>
  );
}
