"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { CURSOR_SIZE } from "@/constants/cursor";
import { LogoProps } from "@/types/layout";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { STAGGER_FADE_UP } from "@/constants/animations";

export default function Logo({ preventAnimation = false }: LogoProps) {
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "header",
    {
      onEnter: { size: CURSOR_SIZE.xs, color: "var(--accent)" },
    },
  );

  return (
    <Link
      href="/"
      className="flex flex-col items-start focus-visible:outline focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Daniele Buser - Creative Developer"
    >
      <motion.span
        className="text-base leading-none font-bold text-(--foreground) md:text-lg"
        initial={
          preventAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          preventAnimation ? {} : STAGGER_FADE_UP(0)
        }
      >
        DANIELE BUSER
      </motion.span>
      <motion.p
        className="text-xs text-(--neutral) md:text-sm"
        initial={
          preventAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          preventAnimation ? {} : STAGGER_FADE_UP(0.1)
        }
      >
        Creative Developer
      </motion.p>
    </Link>
  );
}
