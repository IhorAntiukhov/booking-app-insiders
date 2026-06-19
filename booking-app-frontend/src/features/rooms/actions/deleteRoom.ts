"use server";

import { cookies } from "next/headers";

export default async function deleteRoom(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const response = await fetch(`${process.env.API_URL}/rooms/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken ?? ""}`,
    },
    body: JSON.stringify({
      roomId: id,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
