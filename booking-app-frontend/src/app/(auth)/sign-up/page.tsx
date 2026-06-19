import SignUpForm from "@/features/auth/components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
