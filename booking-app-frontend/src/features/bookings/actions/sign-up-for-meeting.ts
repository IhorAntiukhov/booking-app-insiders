"use server";

import { cookies } from "next/headers";

export default async function signUpForMeeting({
  bookingId,
}: {
  bookingId: number;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(`${process.env.API_URL}/bookings/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken ?? ""}`,
    },
    body: JSON.stringify({
      bookingId,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
