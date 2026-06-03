"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { CURSOR_SIZE } from "@/constants/cursor";
import { NAV_LINKS } from "@/constants/layout";
import { isActiveNavLink } from "@/utils/theme";
import { NavItemProps, NavbarProps } from "@/types/layout";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useLenis } from "lenis/react";

function NavItem({
  href,
  label,
  delay,
  preventAnimation,
}: NavItemProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const isActive = isActiveNavLink(pathname, href);

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "header",
    isActive
      ? {
          onEnter: {
            size: CURSOR_SIZE.xs,
            color: "var(--accent)",
          },
        }
      : undefined,
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isActive) {
      e.preventDefault();
      lenis?.scrollTo(0);
    }
  };

  return (
    <li>
      <motion.div
        initial={
          preventAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          preventAnimation ? {} : { duration: 0.5, ease: "easeOut", delay }
        }
      >
        <Link
          href={href as Route}
          className={`text-xs md:text-sm ${
            isActive ? "font-bold" : "font-normal"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          aria-current={isActive ? "page" : undefined}
        >
          <motion.span
            animate={{
              color: isActive ? "var(--foreground)" : "var(--neutral)",
            }}
            whileHover={
              preventAnimation ? {} : { color: "var(--foreground)" }
            }
            transition={
              preventAnimation ? {} : { duration: 0.3, ease: "easeOut" }
            }
          >
            {label}
          </motion.span>
        </Link>
      </motion.div>
    </li>
  );
}

export default function Navbar({
  preventAnimation = false,
}: NavbarProps) {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex gap-6 sm:gap-8 md:gap-12">
        {NAV_LINKS.map((link, idx) => (
          <NavItem
            key={link.href}
            {...link}
            delay={0.15 + idx * 0.05}
            preventAnimation={preventAnimation}
          />
        ))}
      </ul>
    </nav>
  );
}
