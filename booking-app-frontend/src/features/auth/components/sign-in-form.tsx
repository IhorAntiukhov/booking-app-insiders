"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormInput from "@/components/ui/form-input";
import {
  signInFormSchema,
  SignInFormValues,
} from "@/features/auth/schemas/signInFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import signIn from "../actions/signIn";
import { toast } from "sonner";

export default function SignInForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = handleSubmit(async ({ email, password }) => {
    try {
      await signIn({ email, password });

      toast.success("You successfully logged in!");
    } catch (error) {
      toast.error((error as Error).message);
    }
  });

  return (
    <>
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Welcome back!</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-3">
          <FormInput
            name="email"
            control={control}
            placeholder="Email"
            description="Enter your email"
            type="email"
            errors={errors}
          />

          <FormInput
            name="password"
            control={control}
            placeholder="Password"
            description="Enter your password"
            type="password"
            errors={errors}
          />

          <Button className="w-full">Sign in</Button>
        </form>
      </CardContent>

      <CardFooter>
        <p>
          New to booking?{" "}
          <Link href="/sign-up" className="font-bold">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </>
  );
}
