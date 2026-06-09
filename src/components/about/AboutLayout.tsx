"use client";

import { useElementHeight } from "@/hooks/useElementHeight";
import GridLines from "@/components/layout/GridLines";

export default function AboutLayout({
  children,
  contacts,
}: {
  children: React.ReactNode;
  contacts: React.ReactNode;
}) {
  const [bodyRef, bodyHeight] = useElementHeight<HTMLDivElement>();

  return (
    <>
      <div
        ref={bodyRef}
        className="sticky z-0 flex w-full flex-col gap-0"
        style={{
          top: bodyHeight ? `calc(100vh - ${bodyHeight}px)` : "auto",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <GridLines variant="light" />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
      {contacts}
    </>
  );
}
