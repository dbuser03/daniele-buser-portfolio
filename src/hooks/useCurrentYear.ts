"use client";

// Returns the current year as a string. No client‑side state needed.
export function useCurrentYear(): string {
  return new Date().getFullYear().toString();
}
