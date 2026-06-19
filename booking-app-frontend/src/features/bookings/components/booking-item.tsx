"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IconButton from "@/components/ui/icon-button";
import { formatDate, formatTime } from "@/lib/utils";
import { Trash } from "lucide-react";
import deleteBooking from "../actions/delete-booking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import signUpForMeeting from "../actions/sign-up-for-meeting";
import { Separator } from "@/components/ui/separator";
import FullRoomItem from "@/features/rooms/types/fullRoomItem";
import UserItem from "@/features/rooms/components/user-item";
import FormDialog from "@/components/ui/form-dialog";
import BookingForm from "./booking-form";

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

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking({ id, roomId });

      toast.success("Booking was successfully deleted!");

      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col space-y-3">
        {isAdmin && (
          <div className="flex space-x-3">
            <FormDialog triggerLabel="Update" title="Update booking">
              <BookingForm roomId={roomId} bookingId={id} doUpdate />
            </FormDialog>

            <IconButton onClick={handleDeleteBooking}>
              <Trash size={24} />
            </IconButton>
          </div>
        )}

        <CardTitle>{description}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <Button className="w-full" onClick={handleSignUpForMeeting}>
          Sign up
        </Button>

        <Separator />

        <p>Participants:</p>

        <div className="flex flex-col space-y-3">
          {users.map(({ user: { id, email, name } }) => (
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
      </CardContent>

      <CardFooter className="shrink-0 flex flex-col space-y-3">
        <p>{formatDate(startDate)}</p>
        <p>
          {formatTime(startDate)} - {formatTime(endDate)}
        </p>
      </CardFooter>
    </Card>
  );
}
