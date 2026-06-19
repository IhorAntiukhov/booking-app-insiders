import getRoomById from "@/features/rooms/actions/getRoomById";

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;

  const { data, error } = await getRoomById(+id);

  return <div>RoomPage</div>;
}
