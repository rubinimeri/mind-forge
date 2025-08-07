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
