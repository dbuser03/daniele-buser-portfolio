"use client";

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      lenis?.scrollTo(0);
    }
  };

  return (
    <Link
      href="/"
      className="flex w-fit flex-col items-start pointer-events-auto select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label="Daniele Buser - Creative Developer"
    >
      <m.span
        className="text-body md:text-body-lg leading-tight font-bold text-foreground"
        variants={entranceVariants(motionTokens.delay.none, motionTokens.distance.base, motionTokens.duration.smooth)}
        initial="initial"
        animate="visible"
      >
        DANIELE BUSER
      </m.span>
      <m.p
        className="text-caption md:text-body text-neutral"
        variants={entranceVariants(0.1, motionTokens.distance.base, motionTokens.duration.smooth)}
        initial="initial"
        animate="visible"
      >
        Creative Developer
      </m.p>
    </Link>
  );
}
