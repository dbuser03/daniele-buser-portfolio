"use client";

import { useSyncExternalStore } from "react";

function getTime(): string {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/Zurich",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function subscribe(callback: () => void): () => void {
  const id = setInterval(callback, 10000);
  return () => clearInterval(id);
}

export function useCurrentTime(): string {
  return useSyncExternalStore(subscribe, getTime, () => "");
}
