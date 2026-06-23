import FormDialog from "@/components/ui/form-dialog";
import NewRoomForm from "./new-room-form";
import LogoutButton from "./logout-button";

export default function HomeHeader() {
  return (
    <aside className="flex justify-between space-x-3">
      <FormDialog type="text" triggerLabel="New room" title="Create new room">
        <NewRoomForm />
      </FormDialog>

      <LogoutButton />
    </aside>
  );
}
