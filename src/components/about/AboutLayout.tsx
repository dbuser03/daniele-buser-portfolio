"use client";

import { useRef, useState, useEffect } from "react";

export default function AboutLayout({
  children,
  contacts,
}: {
  children: React.ReactNode;
  contacts: React.ReactNode;
}) {
  const [bodyHeight, setBodyHeight] = useState<number>(0);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBodyHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(bodyRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <div
        ref={bodyRef}
        className="sticky z-0 w-full flex flex-col gap-0"
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
