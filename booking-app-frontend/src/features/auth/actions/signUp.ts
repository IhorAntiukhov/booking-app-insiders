"use server";

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export default async function signUp({ name, email, password }: SignUpProps) {
  const response = await fetch(`${process.env.API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
