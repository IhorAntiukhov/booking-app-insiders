"use client";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import BookingDto from "../types/booking-dto";
import { useState } from "react";
import DatePicker from "@/components/ui/date-picker";
import createBooking from "../actions/create-booking";
import updateBooking from "../actions/update-booking";
import { combineDateAndTime } from "@/lib/dates";

interface BookingFormProps {
  roomId: number;
  bookingId?: number;
  doUpdate?: boolean;
}

export default function BookingForm({
  roomId,
  bookingId,
  doUpdate,
}: BookingFormProps) {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Omit<BookingDto, "roomId">>({
    defaultValues: {
      description: "",
      startDate: "",
      endDate: "",
    },
  });

  const [date, setDate] = useState<Date>();

  const handleNewBooking = handleSubmit(
    async ({ description, startDate, endDate }) => {
      if (!date) toast.warning("Select booking date");

      try {
        const startTime = combineDateAndTime(date!, startDate);
        const endTime = combineDateAndTime(date!, endDate);

        if (doUpdate) {
          await updateBooking({
            id: bookingId!,
            description,
            startDate: startTime.toISOString(),
            endDate: endTime.toISOString(),
            roomId,
          });

          toast.success("Booking was successfully updated!");
        } else {
          await createBooking({
            description,
            startDate: startTime.toISOString(),
            endDate: endTime.toISOString(),
            roomId,
          });

          toast.success("Booking was successfully created!");
        }

        router.refresh();
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
  );

  return (
    <form onSubmit={handleNewBooking} className="space-y-3">
      <FormInput
        name="description"
        control={control}
        placeholder="Description"
        description="Enter booking description"
        type="text"
        errors={errors}
      />

      <DatePicker date={date} setDate={setDate} />

      <FormInput
        name="startDate"
        control={control}
        placeholder="Start time"
        description="Enter start time"
        type="time"
        errors={errors}
        className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />

      <FormInput
        name="endDate"
        control={control}
        placeholder="End time"
        description="Enter end time"
        type="time"
        errors={errors}
        className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />

      <Button className="w-full">
        {doUpdate ? "Update booking" : "New booking"}
      </Button>
    </form>
  );
}
