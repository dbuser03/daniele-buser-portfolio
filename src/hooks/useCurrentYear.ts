"use client";

import { useState, useEffect } from "react";

export function useCurrentYear(): string {
  const [year, setYear] = useState("--");

  useEffect(() => {
    const timer = setTimeout(() => {
      setYear(String(new Date().getFullYear()).slice(-2));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return year;
}
