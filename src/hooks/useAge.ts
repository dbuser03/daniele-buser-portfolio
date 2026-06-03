"use client";

import { useState, useEffect } from "react";
import { getAgeFromBirthDate } from "@/utils/date";

export function useAge(birthDate: Date): number | null {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAge(getAgeFromBirthDate(birthDate));
    }, 0);
    return () => clearTimeout(timer);
  }, [birthDate]);

  return age;
}
