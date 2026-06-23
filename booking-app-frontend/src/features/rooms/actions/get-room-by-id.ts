"use server";

import FullRoomItem from "../types/full-room-item";
import fetchWithCredentials from "@/actions/fetch-with-credentials";

interface GetRoomByIdProps {
  id: number;
}

export default async function getRoomById({ id }: GetRoomByIdProps) {
  const response = await fetchWithCredentials({
    url: `/rooms/${id}`,
    method: "GET",
    setCookies: true,
  });

  const body = await response.json();

  if (!response.ok) {
    return { data: null, error: body.message };
  }

  return { data: body as FullRoomItem, error: null };
}
