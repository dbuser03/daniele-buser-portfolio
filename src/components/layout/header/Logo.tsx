"use client";

import { useCallback } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { STAGGER_FADE_UP } from "@/constants/animations";
import { useLenis } from "lenis/react";

export default function Logo() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("interactive");

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      lenis?.scrollTo(0);
    }
  }, [pathname, lenis]);

  return (
    <Link
      href="/"
      className="flex flex-col items-start focus-visible:outline focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label="Daniele Buser - Creative Developer"
    >
      <motion.span
        className="text-base leading-none font-bold text-(--foreground) md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={STAGGER_FADE_UP(0)}
      >
        DANIELE BUSER
      </motion.span>
      <motion.p
        className="text-xs text-(--neutral) md:text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={STAGGER_FADE_UP(0.1)}
      >
        Creative Developer
      </motion.p>
    </Link>
  );
}
