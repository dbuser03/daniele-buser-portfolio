"use client";

import { m } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { NAV_LINKS } from "@/constants/layout";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useLenis } from "lenis/react";
import { cn } from "@/utils/cn";
import { motionTokens, useAnimations } from "@/utils/motion";
import AnimatedTextSpan from "@/components/ui/AnimatedTextSpan";
import type { NavItemProps } from "@/types/layout";

function NavItem({ href, label, delay }: NavItemProps) {
  const { entranceVariants } = useAnimations();

  const pathname = usePathname();
  const lenis = useLenis();
  const isActive =
    href === "/projects"
      ? pathname === href || pathname.startsWith("/projects/")
      : pathname === href;

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    isActive ? "current" : "interactive",
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isActive && pathname === href) {
      e.preventDefault();
      lenis?.scrollTo(0);
    }
  };

  return (
    <li>
      <m.div
        variants={entranceVariants(delay, motionTokens.distance.base, motionTokens.duration.smooth)}
        initial="initial"
        animate="visible"
      >
        <Link
          href={href as Route}
          className={cn("text-caption md:text-body uppercase", isActive ? "font-bold" : "font-normal")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          aria-current={isActive ? "page" : undefined}
        >
          <AnimatedTextSpan isActive={isActive}>{label}</AnimatedTextSpan>
        </Link>
      </m.div>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav aria-label="Main navigation" className="w-full select-none">
      <ul className="flex w-full justify-between">
        {NAV_LINKS.map((link, idx) => (
          <NavItem key={link.href} {...link} delay={motionTokens.delay.short + idx * motionTokens.stagger.tight} />
        ))}
      </ul>
    </nav>
  );
}
