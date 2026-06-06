"use client";

import { useEffect } from "react";
import GridLines from "@/components/layout/GridLines";

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
    <main
      id="main-content"
      tabIndex={-1}
      className="relative z-10 flex min-h-screen flex-col justify-center bg-(--background) text-(--foreground) px-4 focus:outline-none"
      aria-label="Error page main content"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 mx-4"
        aria-hidden="true"
      >
        <GridLines variant="dark" />
      </div>

      <div className="relative z-10 grid w-full grid-cols-4 gap-4 md:grid-cols-8 xl:grid-cols-12">
        <div className="col-span-4 flex flex-col items-center gap-10 text-center md:col-span-8 xl:col-span-12">
          <h1 className="text-2xl font-bold tracking-wide md:text-3xl">
            Something went wrong
          </h1>
          <div>
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-sm border border-(--foreground) bg-(--background) px-5 py-2.5 text-xs font-normal uppercase tracking-wider text-(--foreground) hover:bg-(--foreground) hover:text-(--background) hover:border-(--foreground) transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
