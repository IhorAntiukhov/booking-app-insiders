"use client";

import IconButton from "@/components/ui/icon-button";
import Role from "@/types/role";
import { Trash, User } from "lucide-react";
import { useRouter } from "next/navigation";
import deleteUserFromRoom from "../actions/delete-user-from-room";
import { toast } from "sonner";

interface UserItemProps {
  id: string;
  role?: Role;
  name: string;
  email: string;
  roomId: number;
  isAdmin: boolean;
}

export default function UserItem({
  id,
  role,
  name,
  email,
  roomId,
  isAdmin,
}: UserItemProps) {
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      await deleteUserFromRoom({ userId: id, roomId });

      toast.success("User was successfully deleted!");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex space-x-3 items-center">
      <User />

      <div className="flex flex-col space-x-3 justify-center">
        <p>
          {`${name}${role ? " |" : ""}`}
          {role && <b>{role}</b>}
        </p>

        <p>{email}</p>
      </div>

      {isAdmin && (
        <IconButton onClick={handleDeleteUser}>
          <Trash />
        </IconButton>
      )}
    </div>
  );
}
