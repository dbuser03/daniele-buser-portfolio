"use client";

import { getAgeFromBirthDate } from "@/utils/date";

export function useAge(birthDate: Date): number {
  return getAgeFromBirthDate(birthDate);
}
