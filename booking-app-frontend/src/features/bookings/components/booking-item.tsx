import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import IconButton from "@/components/ui/icon-button";
import { formatDate, formatTime } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";

interface BookingItemProps {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  isAdmin: boolean;
}

export default function BookingItem({
  description,
  startDate,
  endDate,
  isAdmin,
}: BookingItemProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col space-y-3">
        {isAdmin && (
          <div className="flex space-x-3">
            <IconButton>
              <Pencil size={24} />
            </IconButton>

            <IconButton>
              <Trash size={24} />
            </IconButton>
          </div>
        )}

        <CardTitle>{description}</CardTitle>
      </CardHeader>

      <CardFooter className="flex flex-col space-y-3">
        <p>{formatDate(startDate)}</p>
        <p>
          {formatTime(startDate)} - {formatTime(endDate)}
        </p>
      </CardFooter>
    </Card>
  );
}
