"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--background) text-(--foreground)">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <button
        onClick={reset}
        className="cursor-pointer rounded-sm bg-(--accent) px-4 py-2 text-sm text-(--foreground) transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}
