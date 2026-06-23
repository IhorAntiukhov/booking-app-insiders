"use server";

import type { RequestInit } from "next/dist/server/web/spec-extension/request";
import { cookies } from "next/headers";

interface FetchWithCredentialsProps<T> {
  url: string;
  method: RequestInit["method"];
  body?: T;
  setCookies?: boolean;
}

export default async function fetchWithCredentials<T>({
  url,
  method,
  body,
  setCookies,
}: FetchWithCredentialsProps<T>): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  return await fetch(`${process.env.API_URL}${url}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: setCookies && accessToken ? `access_token=${accessToken}` : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
