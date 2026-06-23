"use server";

import UserItemDto from "../types/user-item-dto";
import fetchWithCredentials from "@/actions/fetch-with-credentials";

export default async function addUserToRoom({
  email,
  role,
  roomId,
}: UserItemDto) {
  const response = await fetchWithCredentials({
    url: "/rooms/usersInRoom",
    method: "POST",
    body: { email, role, roomId },
    setCookies: true,
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
