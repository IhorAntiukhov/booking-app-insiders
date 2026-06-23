import React from "react";

export default function ErrorText({ children }: React.PropsWithChildren) {
  return <p className="text-red-500">Error: {children}</p>;
}
