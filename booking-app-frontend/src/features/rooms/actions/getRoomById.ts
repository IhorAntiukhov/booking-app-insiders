"use server";

import { cookies } from "next/headers";
import FullRoomItem from "../types/fullRoomItem";

export default async function getRoomById(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(`${process.env.API_URL}/rooms/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken ?? ""}`,
    },
  });

  const body = await response.json();

  if (!response.ok) {
    return { data: null, error: body.message };
  }

  return { data: body as FullRoomItem[], error: null };
}
