"use client";

import { m } from "motion/react";
import TimeDisplay from "./TimeDisplay";
import { motionTokens, useAnimations } from "@/utils/motion";

export default function Footer() {
  const { entranceVariants } = useAnimations();

  return (
    <footer
      className="pointer-events-none fixed bottom-0 left-1/2 z-30 flex w-full max-w-480 -translate-x-1/2 flex-col p-4 mix-blend-difference"
      aria-label="Site footer with location and time"
    >
      <div className="pointer-events-auto w-fit select-none">
        <m.p
          className="text-body leading-tight text-foreground"
          variants={entranceVariants(0.8, motionTokens.distance.base, motionTokens.duration.smooth)}
          initial="initial"
          animate="visible"
        >
          LUGANO - <TimeDisplay />
        </m.p>
        <m.p
          className="text-body text-neutral"
          variants={entranceVariants(0.9, motionTokens.distance.base, motionTokens.duration.smooth)}
          initial="initial"
          animate="visible"
        >
          46&deg; 00&apos; 13.24&quot; - 08&deg; 57&apos; 03.79&quot;
        </m.p>
      </div>
    </footer>
  );
}
