"use server";

import { cookies } from "next/headers";
import UserRoomDto from "../types/user-room-dto";

export default async function deleteUserFromRoom({
  userId,
  roomId,
}: UserRoomDto) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(`${process.env.API_URL}/rooms/usersInRoom`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken ?? ""}`,
    },
    body: JSON.stringify({
      userId,
      roomId,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
