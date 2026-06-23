"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FormInput from "@/components/ui/form-input";
import { useForm } from "react-hook-form";
import UserItemDto from "../types/user-item-dto";
import addUserToRoom from "../actions/add-user-to-room";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Role from "@/types/role";

interface NewUserFormProps {
  roomId: number;
}

export default function NewUserForm({ roomId }: NewUserFormProps) {
  const router = useRouter();

  const [role, setRole] = useState<Role>("user");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Omit<UserItemDto, "role" | "roomId">>({
    defaultValues: {
      email: "",
    },
  });

  const handleAddNewUserToRoom = handleSubmit(async ({ email }) => {
    try {
      await addUserToRoom({ email, role, roomId });

      toast.success("You successfully added a user to room!");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  });

  const switchRole = () => {
    setRole((role) => (role === "admin" ? "user" : "admin"));
  };

  return (
    <Card className="flex space-x-3">
      <CardContent>
        <form onSubmit={handleAddNewUserToRoom} className="space-y-3">
          <FormInput
            name="email"
            control={control}
            placeholder="Email"
            description="Enter user's email"
            type="email"
            errors={errors}
          />

          <Button
            variant="secondary"
            onClick={switchRole}
            type="button"
            className="w-full"
          >
            Role: {role}
          </Button>

          <Button className="w-full">Add user</Button>
        </form>
      </CardContent>
    </Card>
  );
}
