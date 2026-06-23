"use server";

import fetchWithCredentials from "@/actions/fetch-with-credentials";

interface DeleteRoomProps {
  id: number;
}

export default async function deleteRoom({ id }: DeleteRoomProps) {
  const response = await fetchWithCredentials({
    url: `/rooms/${id}`,
    method: "DELETE",
    body: {
      roomId: id,
    },
    setCookies: true,
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
