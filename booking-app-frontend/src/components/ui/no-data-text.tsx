import React from "react";

export default function NoDataText({ children }: React.PropsWithChildren) {
  return <p className="text-gray-500">{children}</p>;
}
