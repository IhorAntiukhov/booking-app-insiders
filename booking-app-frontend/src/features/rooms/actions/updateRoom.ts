"use server";

import { cookies } from "next/headers";
import RoomDto from "../types/roomDto";

export default async function updateRoom({
  id,
  name,
  description,
}: RoomDto & { id: number }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(`${process.env.API_URL}/rooms/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken ?? ""}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
