"use server";

import RoomDto from "../types/room-dto";
import fetchWithCredentials from "@/actions/fetch-with-credentials";

interface UpdateRoomProps extends RoomDto {
  id: number;
}

export default async function updateRoom({
  id,
  name,
  description,
}: UpdateRoomProps) {
  const response = await fetchWithCredentials({
    url: `/rooms/${id}`,
    method: "PUT",
    body: {
      name,
      description,
    },
    setCookies: true,
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
