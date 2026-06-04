"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import type { Route } from "next";
import type { TechStackIconProps } from "@/types/about";
import { TECH_CELL_SPRING_CONFIG } from "@/constants/animations";
import { cn } from "@/utils/cn";

export default function TechStackIcon({
  icon,
  isActive,
  isFullyActive,
  handleMouseEnter,
  handleMouseLeave,
  onFocus,
  onBlur,
}: TechStackIconProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (isMouseOver && isFullyActive) {
      handleMouseEnter();
    } else {
      handleMouseLeave();
    }
  }, [isFullyActive, isMouseOver, handleMouseEnter, handleMouseLeave]);

  return (
    <Link
      href={icon.href as Route}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-30 flex h-full w-full items-center justify-center focus-visible:z-40 focus-visible:outline focus-visible:outline-(--accent) focus-visible:-outline-offset-2"
      aria-label={`Visit ${icon.label} website (opens in new tab)`}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div
        className={cn("inline-flex items-center justify-center", icon.hoverPaddingClass ?? "p-6 sm:p-9")}
      >
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
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
          animate={{
            backgroundColor: isActive
              ? "var(--foreground)"
              : "var(--background)",
          }}
          transition={{
            backgroundColor: TECH_CELL_SPRING_CONFIG,
          }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
