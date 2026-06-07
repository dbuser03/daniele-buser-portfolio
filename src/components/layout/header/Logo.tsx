"use client";

import { useCallback } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { FADE_UP } from "@/constants/animations";
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
      className="flex flex-col items-start"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label="Daniele Buser - Creative Developer"
    >
      <motion.span
        className="text-lg leading-none font-bold text-(--foreground)"
        {...FADE_UP(0)}
      >
        DANIELE BUSER
      </motion.span>
      <motion.p
        className="text-sm text-(--neutral)"
        {...FADE_UP(0.1)}
      >
        Creative Developer
      </motion.p>
    </Link>
  );
}
