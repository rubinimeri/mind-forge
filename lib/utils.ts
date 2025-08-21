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

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
export const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export function formatDate(date: Date) {
  const prismaDate = new Date(date)

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(prismaDate);
}