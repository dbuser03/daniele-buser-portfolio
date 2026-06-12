"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export default function SmoothScrolling({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (disabled || shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.2,
        smoothWheel: true,
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
