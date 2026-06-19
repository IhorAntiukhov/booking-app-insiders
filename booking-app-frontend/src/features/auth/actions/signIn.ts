"use server";

import { cookies } from "next/headers";

interface SignInProps {
  email: string;
  password: string;
}

export default async function signIn({ email, password }: SignInProps) {
  const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }

  const setCookieHeader = response.headers.get("set-cookie");

  if (setCookieHeader) {
    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: extractCookieValue(setCookieHeader),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: Date.now() + Number(process.env.ACCESS_TOKEN_MAX_AGE),
    });
  }
}

function extractCookieValue(headerString: string) {
  return headerString.split(";")[0].split("=")[1];
}
