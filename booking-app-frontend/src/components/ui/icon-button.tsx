import React from "react";
import { Button } from "./button";

export default function IconButton({
  children,
  ...rest
}: React.ComponentProps<"button">) {
  return (
    <Button variant="ghost" className="rounded-full" {...rest}>
      {children}
    </Button>
  );
}
