import HomeHeader from "@/features/rooms/components/home-header";
import RoomGallery from "@/features/rooms/components/room-gallery";

export default function Home() {
  return (
    <div className="flex flex-col space-y-5 p-5">
      <HomeHeader />

      <RoomGallery />
    </div>
  );
}
