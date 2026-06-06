"use client";

import { getAgeFromBirthDate } from "@/utils/date";

// Returns age directly – no client side state needed.
export function useAge(birthDate: Date): number {
  return getAgeFromBirthDate(birthDate);
}
