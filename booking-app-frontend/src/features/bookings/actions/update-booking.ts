"use server";

import BookingDto from "../types/booking-dto";
import fetchWithCredentials from "@/actions/fetch-with-credentials";

interface UpdateBookingProps extends BookingDto {
  id: number;
}

export default async function updateBooking({
  id,
  description,
  startDate,
  endDate,
  roomId,
}: UpdateBookingProps) {
  const response = await fetchWithCredentials({
    url: `/bookings/${id}`,
    method: "PUT",
    body: {
      description,
      startDate,
      endDate,
      roomId,
    },
    setCookies: true,
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
