"use server";

import { cookies } from "next/headers";
import RoomItem from "../types/roomItem";

export default async function getRooms() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(`${process.env.API_URL}/rooms`, {
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

  return { data: body as RoomItem[], error: null };
}
