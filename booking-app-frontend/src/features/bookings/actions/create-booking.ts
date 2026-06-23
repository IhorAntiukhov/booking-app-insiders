"use server";

import BookingDto from "../types/booking-dto";
import fetchWithCredentials from "@/actions/fetch-with-credentials";

export default async function createBooking({
  description,
  startDate,
  endDate,
  roomId,
}: BookingDto) {
  const response = await fetchWithCredentials({
    url: "/bookings",
    method: "POST",
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
