"use client";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/form-input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function BookingForm() {
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

  return (
    <form onSubmit={handleNewRoom} className="space-y-3">
      <FormInput
        name="name"
        control={control}
        placeholder="Name"
        description="Enter booking description"
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
