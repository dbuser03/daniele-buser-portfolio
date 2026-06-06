"use client";

import { useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { CURSOR_SIZE } from "@/constants/cursor";
import { NAV_LINKS } from "@/constants/layout";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useLenis } from "lenis/react";
import { cn } from "@/utils/cn";
import { STAGGER_FADE_UP } from "@/constants/animations";
import type { NavItemProps } from "@/types/layout";

function NavItem({ href, label, delay }: NavItemProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const isActive =
    href === "/"
      ? pathname === "/" || pathname.startsWith("/projects/")
      : pathname === href;

  const cursorConfig = useMemo(() => isActive ? {
    onEnter: {
      size: CURSOR_SIZE.xs,
      color: "var(--accent)",
    },
  } : undefined, [isActive]);

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "header",
    cursorConfig,
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={STAGGER_FADE_UP(delay)}
      >
        <Link
          href={href as Route}
          className={cn(
            "text-xs md:text-sm focus-visible:outline focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm",
            isActive ? "font-bold" : "font-normal",
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          aria-current={isActive ? "page" : undefined}
        >
          <motion.span
            animate={{
              color: isActive ? "var(--foreground)" : "var(--neutral)",
            }}
            whileHover={{ color: "var(--foreground)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {label}
          </motion.span>
        </Link>
      </motion.div>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex gap-6 sm:gap-8 md:gap-12">
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
