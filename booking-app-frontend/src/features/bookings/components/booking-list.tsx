import FullRoomItem from "@/features/rooms/types/full-room-item";
import BookingItem from "./booking-item";
import FormDialog from "@/components/ui/form-dialog";
import BookingForm from "./booking-form";
import NoDataText from "@/components/ui/no-data-text";

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
  return (
    <div className="flex flex-col space-y-3">
      {isAdmin && (
        <FormDialog
          type="text"
          triggerLabel="New booking"
          title="Create booking"
        >
          <BookingForm roomId={roomId} />
        </FormDialog>
      )}

      <div className="space-y-3">
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
          <NoDataText>No bookings yet</NoDataText>
        )}
      </div>
    </div>
  );
}
