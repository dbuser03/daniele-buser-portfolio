"use client";

import { motion } from "motion/react";
import TimeDisplay from "./TimeDisplay";
import { motionTokens, entranceVariants } from "@/constants/animations";

export default function Footer() {
  return (
    <footer
      className="pointer-events-none fixed bottom-0 z-30 flex w-full flex-col p-4 mix-blend-difference"
      aria-label="Site footer with location and time"
    >
      <div className="pointer-events-auto w-fit">
        <motion.p
          className="text-sm leading-none text-(--foreground)"
          variants={entranceVariants(0.8, 20, motionTokens.duration.smooth)}
          initial="initial"
          animate="visible"
        >
          LUGANO - <TimeDisplay />
        </motion.p>
        <motion.p
          className="text-sm text-(--neutral)"
          variants={entranceVariants(0.9, 20, motionTokens.duration.smooth)}
          initial="initial"
          animate="visible"
        >
          46&deg; 00&apos; 13.24&quot; - 08&deg; 57&apos; 03.79&quot;
        </motion.p>
      </div>
    </footer>
  );
}
