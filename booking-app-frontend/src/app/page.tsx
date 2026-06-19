import Header from "@/features/rooms/components/header";
import RoomGallery from "@/features/rooms/components/room-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms",
};

export default function Home() {
  return (
    <div className="flex flex-col space-y-5 p-5">
      <Header />

      <RoomGallery />
    </div>
  );
}
