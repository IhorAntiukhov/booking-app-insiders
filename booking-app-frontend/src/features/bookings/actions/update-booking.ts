"use server";

import { cookies } from "next/headers";
import BookingDto from "../types/booking-dto";

export default async function updateBooking({
  id,
  description,
  startDate,
  endDate,
  roomId,
}: BookingDto & { id: number }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  console.log(roomId);

  const response = await fetch(`${process.env.API_URL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken ?? ""}`,
    },
    body: JSON.stringify({
      description,
      startDate,
      endDate,
      roomId,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
