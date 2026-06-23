"use server";

import RoomItem from "../types/room-item";
import fetchWithCredentials from "@/actions/fetch-with-credentials";

export default async function getRooms() {
  const response = await fetchWithCredentials({
    url: "/rooms",
    method: "GET",
    setCookies: true,
  });

  const body = await response.json();

  if (!response.ok) {
    return { data: null, error: body.message };
  }

  return { data: body as RoomItem[], error: null };
}
