import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/dates";
import Link from "next/link";

interface RoomItemProps {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export default function RoomItem({
  id,
  name,
  description,
  createdAt,
}: RoomItemProps) {
  return (
    <Link href={`/room/${id}`} className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardFooter>
          <p>{formatDate(createdAt)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
