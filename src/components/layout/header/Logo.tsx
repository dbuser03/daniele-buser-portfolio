"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { CURSOR_SIZE } from "@/constants/cursor";
import { LogoProps } from "@/types/layout";
import { getPrimaryColor, getSecondaryColor } from "@/utils/theme";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

import { useThemeVariant } from "@/hooks/useThemeVariant";

export default function Logo({
  preventAnimation = false,
}: LogoProps) {
  const variant = useThemeVariant();
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "header",
    {
      onEnter: { size: CURSOR_SIZE.xs, color: "var(--accent)" },
    },
  );

  return (
    <Link
      href="/"
      className="flex flex-col items-start"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Daniele Buser - Creative Developer"
    >
      <motion.span
        className="text-base leading-none font-bold md:text-lg"
        style={{ color: getPrimaryColor(variant) }}
        initial={
          preventAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          preventAnimation ? {} : { duration: 0.5, ease: "easeOut", delay: 0 }
        }
      >
        DANIELE BUSER
      </motion.span>
      <motion.p
        className="text-xs md:text-sm"
        style={{ color: getSecondaryColor(variant) }}
        initial={
          preventAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          preventAnimation ? {} : { duration: 0.5, ease: "easeOut", delay: 0.1 }
        }
      >
        Creative Developer
      </motion.p>
    </Link>
  );
}
