"use server";

import fetchWithCredentials from "@/actions/fetch-with-credentials";

interface CancelBookingProps {
  bookingId: number;
}

export default async function cancelBooking({ bookingId }: CancelBookingProps) {
  const response = await fetchWithCredentials({
    url: `/bookings/sign-up/${bookingId}`,
    method: "DELETE",
    setCookies: true,
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
