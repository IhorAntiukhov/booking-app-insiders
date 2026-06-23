"use server";

import RoomDto from "../types/room-dto";
import fetchWithCredentials from "@/actions/fetch-with-credentials";

export default async function createRoom({ name, description }: RoomDto) {
  const response = await fetchWithCredentials({
    url: "/rooms",
    method: "POST",
    body: {
      name,
      description,
    },
    setCookies: true,
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
