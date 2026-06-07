"use client";

export function useCurrentYear(): string {
  return new Date().getFullYear().toString();
}
