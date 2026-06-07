"use client";

import { useSyncExternalStore } from "react";

function getTime(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function subscribe(callback: () => void): () => void {
  const id = setInterval(callback, 60000);
  return () => clearInterval(id);
}

export function useCurrentTime(): string {
  return useSyncExternalStore(subscribe, getTime, () => "");
}
