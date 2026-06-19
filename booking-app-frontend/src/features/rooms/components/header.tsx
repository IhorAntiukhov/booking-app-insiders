"use client";

import { Button } from "@/components/ui/button";
import FormDialog from "@/components/ui/form-dialog";
import FormInput from "@/components/ui/form-input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Room from "../types/roomDto";
import createRoom from "../actions/createRoom";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Room>({
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
    <aside className="flex justify-between space-x-3">
      <FormDialog triggerLabel="New room" title="Create new room">
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
      </FormDialog>

      <Button variant="secondary">Logout</Button>
    </aside>
  );
}
