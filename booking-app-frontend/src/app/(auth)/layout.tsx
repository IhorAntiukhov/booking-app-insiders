import { Card } from "@/components/ui/card";
import React from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Card className="w-full max-w-96">{children}</Card>
    </div>
  );
}
