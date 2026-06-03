"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScrolling({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
