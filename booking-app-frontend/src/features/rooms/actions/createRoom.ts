"use server";

import Room from "../types/room";

export default async function createRoom({ name, description }: Room) {
  const response = await fetch(`${process.env.API_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
