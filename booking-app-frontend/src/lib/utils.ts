import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: number | string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function formatTime(date: number | string) {
  return new Date(date).toLocaleDateString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
