import SignInForm from "@/features/auth/components/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return <SignInForm />;
}
