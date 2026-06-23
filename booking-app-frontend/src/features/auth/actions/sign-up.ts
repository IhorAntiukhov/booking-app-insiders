"use server";

import fetchWithCredentials from "@/actions/fetch-with-credentials";

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export default async function signUp({ name, email, password }: SignUpProps) {
  const response = await fetchWithCredentials({
    url: "/auth/sign-up",
    method: "POST",
    body: { name, email, password },
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
