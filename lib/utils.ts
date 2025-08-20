import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanAndParse(jsonWithBackticks: string) {
  const cleaned = jsonWithBackticks
    .trim()
    .replace(/^```json\s*/i, '')  // remove starting ```json
    .replace(/```$/, '');         // remove ending ```

  return JSON.parse(cleaned);
}

export function formatDate(date: Date) {
  const prismaDate = new Date(date)

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(prismaDate);
}