"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { frame, cancelFrame } from "motion/react";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

function LenisRaf() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = (timeData: { timestamp: number }) => {
      lenis.raf(timeData.timestamp);
    };

    // Il parametro `true` mantiene il loop attivo costantemente (keepAlive)
    frame.update(update, true);

    return () => cancelFrame(update);
  }, [lenis]);

  return null;
}

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
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.05,
        duration: 1.2,
        smoothWheel: true,
        allowNestedScroll: true,
      }}
    >
      <ScrollReset />
      <LenisRaf />
      {children}
    </ReactLenis>
  );
}
