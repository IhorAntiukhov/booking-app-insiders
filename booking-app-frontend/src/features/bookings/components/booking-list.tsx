import FullRoomItem from "@/features/rooms/types/fullRoomItem";
import BookingItem from "./booking-item";
import FormDialog from "@/components/ui/form-dialog";
import BookingForm from "./booking-form";

interface BookingListProps {
  roomId: number;
  isAdmin: boolean;
  bookings: FullRoomItem["bookings"] | null;
}

export default function BookingList({
  roomId,
  bookings,
  isAdmin,
}: BookingListProps) {
  console.log(bookings);

  return (
    <div className="flex flex-col space-y-5 w-full max-w-60">
      <FormDialog triggerLabel="New booking" title="Create booking">
        <BookingForm roomId={roomId} />
      </FormDialog>

      <div className="flex flex-col space-y-3 w-full">
        {!!bookings && bookings.length > 0 ? (
          bookings.map(
            ({ id, description, startDate, endDate, usersInBooking }) => (
              <BookingItem
                key={id}
                id={id}
                description={description}
                startDate={startDate}
                endDate={endDate}
                isAdmin={isAdmin}
                users={usersInBooking}
                roomId={roomId}
              />
            ),
          )
        ) : (
          <p>No bookings yet</p>
        )}
      </div>
    </div>
  );
}
