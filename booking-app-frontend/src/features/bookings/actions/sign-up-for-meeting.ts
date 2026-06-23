"use server";

import fetchWithCredentials from "@/actions/fetch-with-credentials";

interface SignUpForMeetingProps {
  bookingId: number;
}

export default async function signUpForMeeting({
  bookingId,
}: SignUpForMeetingProps) {
  const response = await fetchWithCredentials({
    url: "/bookings/sign-up",
    method: "POST",
    body: {
      bookingId,
    },
    setCookies: true,
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
