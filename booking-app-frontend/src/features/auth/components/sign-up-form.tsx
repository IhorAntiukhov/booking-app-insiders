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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  signUpFormSchema,
  SignUpFormValues,
} from "../schemas/signUpFormSchema";
import signUp from "../actions/signUp";
import { toast } from "sonner";

export default function SignUpForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = handleSubmit(async ({ name, email, password }) => {
    try {
      await signUp({ name, email, password });

      toast.success("User was successfully created!");
    } catch (error) {
      toast.error((error as Error).message);
    }
  });

  return (
    <>
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Welcome to Booking App</CardTitle>
        <CardDescription>
          Create rooms, invite users, and make bookings
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="space-y-3">
            <FormInput
              name="name"
              control={control}
              placeholder="User name"
              description="Enter your name"
              type="text"
              errors={errors}
            />

            <FormInput
              name="email"
              control={control}
              placeholder="Email"
              description="Enter your email"
              type="email"
              errors={errors}
            />
          </div>

          <div className="space-y-3">
            <FormInput
              name="password"
              control={control}
              placeholder="Password"
              description="Enter your password"
              type="password"
              errors={errors}
            />

            <FormInput
              name="confirmPassword"
              control={control}
              placeholder="Password"
              description="Confirm your password"
              type="password"
              errors={errors}
            />
          </div>

          <Button className="w-full">Sign up</Button>
        </form>
      </CardContent>

      <CardFooter>
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-bold">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </>
  );
}
