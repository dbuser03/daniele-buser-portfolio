"use client";

import { useCallback } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { NAV_LINKS } from "@/constants/layout";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useLenis } from "lenis/react";
import { cn } from "@/utils/cn";
import { FADE_UP } from "@/constants/animations";
import AnimatedTextSpan from "@/components/ui/AnimatedTextSpan";
import type { NavItemProps } from "@/types/layout";

function NavItem({ href, label, delay }: NavItemProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const isActive =
    href === "/"
      ? pathname === "/" || pathname.startsWith("/projects/")
      : pathname === href;

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    isActive ? "current" : "interactive",
  );

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isActive && pathname === href) {
      e.preventDefault();
      lenis?.scrollTo(0);
    }
  }, [isActive, pathname, href, lenis]);

  return (
    <li>
      <motion.div
        {...FADE_UP(delay)}
      >
        <Link
          href={href as Route}
          className={cn(
            "text-sm",
            isActive ? "font-bold" : "font-normal",
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          aria-current={isActive ? "page" : undefined}
        >
          <AnimatedTextSpan isActive={isActive}>{label}</AnimatedTextSpan>
        </Link>
      </motion.div>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex gap-12">
        {NAV_LINKS.map((link, idx) => (
          <NavItem
            key={link.href}
            {...link}
            delay={0.15 + idx * 0.05}
          />
        ))}
      </ul>
    </nav>
  );
}
