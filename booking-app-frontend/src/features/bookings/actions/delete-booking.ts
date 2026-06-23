"use server";

import fetchWithCredentials from "@/actions/fetch-with-credentials";

interface DeleteBookingProps {
  id: number;
}

export default async function deleteBooking({ id }: DeleteBookingProps) {
  const response = await fetchWithCredentials({
    url: `/bookings/${id}`,
    method: "DELETE",
    setCookies: true,
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
