"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IconButton from "@/components/ui/icon-button";
import { Pencil, Trash } from "lucide-react";
import deleteBooking from "../actions/delete-booking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import signUpForMeeting from "../actions/sign-up-for-meeting";
import { Separator } from "@/components/ui/separator";
import FullRoomItem from "@/features/rooms/types/full-room-item";
import UserItem from "@/features/rooms/components/user-item";
import FormDialog from "@/components/ui/form-dialog";
import BookingForm from "./booking-form";
import { formatDate, formatTime } from "@/lib/dates";
import cancelBooking from "../actions/cancel-booking";

interface BookingItemProps {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  isAdmin: boolean;
  roomId: number;
  users: FullRoomItem["bookings"][number]["usersInBooking"];
}

export default function BookingItem({
  id,
  description,
  startDate,
  endDate,
  isAdmin,
  roomId,
  users,
}: BookingItemProps) {
  const router = useRouter();

  const handleSignUpForMeeting = async () => {
    try {
      await signUpForMeeting({ bookingId: id });

      toast.success("You signed up for meeting successfully!");

      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await cancelBooking({ bookingId: id });

      toast.success("You canceled the booking successfully!");

      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking({ id });

      toast.success("Booking was successfully deleted!");

      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col">
        {isAdmin && (
          <div className="flex items-center space-x-1.5">
            <FormDialog type="icon" title="Update booking" icon={<Pencil />}>
              <BookingForm roomId={roomId} bookingId={id} doUpdate />
            </FormDialog>

            <IconButton onClick={handleDeleteBooking}>
              <Trash size={24} />
            </IconButton>
          </div>
        )}

        <CardTitle>{description}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {users.length > 0 && (
          <>
            <div className="-mx-4">
              <Separator />
            </div>

            <p>Participants:</p>

            <div className="flex flex-col space-y-3">
              {users.map(({ id, email, name }) => (
                <UserItem
                  key={id}
                  name={name}
                  id={id}
                  email={email}
                  roomId={0}
                  isAdmin={false}
                />
              ))}
            </div>
          </>
        )}

        {users.findIndex(({ isOwner }) => isOwner) === -1 ? (
          <Button className="w-full" onClick={handleSignUpForMeeting}>
            Sign up
          </Button>
        ) : (
          <Button className="w-full" onClick={handleCancelBooking}>
            Cancel
          </Button>
        )}
      </CardContent>

      <CardFooter className="shrink-0 flex flex-col space-y-1.5">
        <p>{formatDate(startDate)}</p>
        <p>
          {formatTime(startDate)} - {formatTime(endDate)}
        </p>
      </CardFooter>
    </Card>
  );
}
