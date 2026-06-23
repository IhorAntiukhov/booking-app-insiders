"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import RoomDto from "../types/room-dto";
import { toast } from "sonner";
import updateRoom from "../actions/update-room";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import deleteRoom from "../actions/delete-room";

interface EditRoomProps {
  id: number;
  name: string;
  description: string;
}

export default function EditRoom({ id, name, description }: EditRoomProps) {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RoomDto>({
    defaultValues: {
      name,
      description,
    },
  });

  const handleUpdateRoom = handleSubmit(async ({ name, description }) => {
    try {
      await updateRoom({ id, name, description });

      toast.success("Room was successfully updated!");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  });

  const handleDeleteRoom = async () => {
    try {
      await deleteRoom({ id });

      toast.success("Room was successfully deleted!");

      router.refresh();
      router.replace("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card className="self-start">
      <CardHeader>
        <CardTitle>Edit room</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <form onSubmit={handleUpdateRoom} className="space-y-5">
          <div className="space-y-3">
            <FormInput
              name="name"
              control={control}
              placeholder="Name"
              description="Enter room name"
              type="text"
              errors={errors}
            />

            <FormInput
              name="description"
              control={control}
              placeholder="Description"
              description="Enter room description"
              type="text"
              errors={errors}
            />
          </div>

          <Button className="w-full">Update room</Button>
        </form>

        <Button
          variant="destructive"
          className="w-full"
          onClick={handleDeleteRoom}
        >
          Delete room
        </Button>
      </CardContent>
    </Card>
  );
}
