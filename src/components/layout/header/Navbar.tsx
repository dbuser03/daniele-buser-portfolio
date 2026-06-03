"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CURSOR_SIZE } from "@/constants/cursor";
import { NAV_LINKS } from "@/constants/layout";
import {
  isActiveNavLink,
  getNavbarTextColor,
  getPrimaryColor,
} from "@/utils/theme";
import { NavItemProps, NavbarProps } from "@/types/layout";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

function NavItem({
  href,
  label,
  delay,
  pathname,
  variant,
  preventAnimation,
}: NavItemProps) {
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
          href={href}
          className={`text-xs md:text-sm ${
            isActive ? "font-bold" : "font-normal"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-current={isActive ? "page" : undefined}
        >
          <motion.span
            animate={{
              color: getNavbarTextColor(variant, isActive),
            }}
            whileHover={
              preventAnimation ? {} : { color: getPrimaryColor(variant) }
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
  variant = "dark",
  preventAnimation = false,
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex gap-6 sm:gap-8 md:gap-12">
        {NAV_LINKS.map((link, idx) => (
          <NavItem
            key={link.href}
            {...link}
            delay={0.15 + idx * 0.05}
            pathname={pathname}
            variant={variant}
            preventAnimation={preventAnimation}
          />
        ))}
      </ul>
    </nav>
  );
}
