"use server";

import { cookies } from "next/headers";
import UserItemDto from "../types/user-item-dto";

export default async function addUserToRoom({
  email,
  role,
  roomId,
}: UserItemDto) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(`${process.env.API_URL}/rooms/usersInRoom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken ?? ""}`,
    },
    body: JSON.stringify({
      email,
      role,
      roomId,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
