"use client";

import FullRoomItem from "@/features/rooms/types/fullRoomItem";
import FormInput from "@/components/ui/form-input";
import { Button } from "@/components/ui/button";
import UserItem from "./user-item";
import { useForm } from "react-hook-form";
import UserItemDto from "../types/user-item-dto";
import { useState } from "react";
import Role from "@/types/role";
import addUserToRoom from "../actions/add-user-to-room";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface BookingListProps {
  roomId: number;
  isAdmin: boolean;
  users: FullRoomItem["usersInRoom"] | null;
}

export default function UserList({ roomId, users, isAdmin }: BookingListProps) {
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

      toast.success("Room was successfully updated!");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  });

  const switchRole = () => {
    setRole((role) => (role === "admin" ? "user" : "admin"));
  };

  return (
    <div className="flex flex-col space-y-5">
      {isAdmin && (
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
      )}

      <div className="flex flex-col space-y-3">
        {!!users && users.length > 0 ? (
          users.map(({ role, user: { name, id, email } }) => (
            <UserItem
              key={id}
              id={id}
              role={role}
              name={name}
              email={email}
              isAdmin={isAdmin}
              roomId={roomId}
            />
          ))
        ) : (
          <p>No bookings yet</p>
        )}
      </div>
    </div>
  );
}
