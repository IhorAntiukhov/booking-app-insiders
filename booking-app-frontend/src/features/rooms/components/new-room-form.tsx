"use client";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import { useForm } from "react-hook-form";
import RoomDto from "../types/room-dto";
import createRoom from "../actions/create-room";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewRoomForm() {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RoomDto>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleNewRoom = handleSubmit(async ({ name, description }) => {
    try {
      await createRoom({ name, description });

      toast.success("Room was successfully created!");
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    }
  });

  return (
    <form onSubmit={handleNewRoom} className="space-y-3">
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

      <Button className="w-full">New room</Button>
    </form>
  );
}
