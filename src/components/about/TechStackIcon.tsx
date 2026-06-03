"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { Route } from "next";
import type { TechStackIconProps } from "@/types/about";

export default function TechStackIcon({
  icon,
  isActive,
  handleMouseEnter,
  handleMouseLeave,
}: TechStackIconProps) {
  return (
    <Link
      href={icon.href as Route}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-30 flex h-full w-full items-center justify-center"
      aria-label={`Visit ${icon.label} website`}
    >
      <div className={`inline-flex items-center justify-center ${icon.hoverPaddingClass ?? "p-6 sm:p-9"}`}>
        <motion.div
          className={icon.sizeClass}
          style={{
            WebkitMaskImage: `url(${icon.path})`,
            maskImage: `url(${icon.path})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={{
            backgroundColor: isActive
              ? "var(--foreground)"
              : "var(--background)",
          }}
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
