"use client";

import { useCallback } from "react";
import { m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { motionTokens, useAnimations } from "@/utils/motion";
import { useLenis } from "lenis/react";

export default function Logo() {
  const { entranceVariants } = useAnimations();

  const pathname = usePathname();
  const lenis = useLenis();
  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("interactive");

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        lenis?.scrollTo(0);
      }
    },
    [pathname, lenis],
  );

  return (
    <Link
      href="/"
      className="flex flex-col items-start"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label="Daniele Buser - Creative Developer"
    >
      <m.span
        className="text-lg leading-none font-bold text-(--foreground)"
        variants={entranceVariants(0, 20, motionTokens.duration.smooth)}
        initial="initial"
        animate="visible"
      >
        DANIELE BUSER
      </m.span>
      <m.p
        className="text-sm text-(--neutral)"
        variants={entranceVariants(0.1, 20, motionTokens.duration.smooth)}
        initial="initial"
        animate="visible"
      >
        Creative Developer
      </m.p>
    </Link>
  );
}
