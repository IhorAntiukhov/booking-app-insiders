import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface RoomItemProps {
  id: number;
  name: string;
  description: string;
}

export default function RoomItem({ id, name, description }: RoomItemProps) {
  return (
    <Link href={`/room/${id}`} className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
