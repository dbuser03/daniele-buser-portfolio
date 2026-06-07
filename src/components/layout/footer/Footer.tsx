"use client";

import { motion } from "motion/react";
import TimeDisplay from "./TimeDisplay";
import { STAGGER_FADE_UP } from "@/constants/animations";

export default function Footer() {
  return (
    <footer
      className="pointer-events-none fixed bottom-0 z-30 flex w-full flex-col p-4 mix-blend-difference"
      aria-label="Site footer with location and time"
    >
      <div className="pointer-events-auto w-fit">
        <motion.p
          className="text-sm leading-none text-(--foreground)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={STAGGER_FADE_UP(0.8)}
        >
          LUGANO - <TimeDisplay />
        </motion.p>
        <motion.p
          className="text-sm text-(--neutral)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={STAGGER_FADE_UP(0.9)}
        >
          46&deg; 00&apos; 13.24&quot; - 08&deg; 57&apos; 03.79&quot;
        </motion.p>
      </div>
    </footer>
  );
}

