"use client";

import { useElementHeight } from "@/hooks/useElementHeight";

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
        {children}
      </div>
      {contacts}
    </>
  );
}
