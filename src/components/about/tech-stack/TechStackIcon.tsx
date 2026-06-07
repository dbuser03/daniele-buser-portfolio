"use client";

import { useEffect, useRef, memo } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import type { Route } from "next";
import type { TechStackIconProps } from "@/types/about";
import { TECH_CELL_SPRING_CONFIG } from "@/constants/animations";
import { CSS_VARIABLES } from "@/constants/theme";
import { cn } from "@/utils/cn";

function TechStackIcon({
  icon,
  isActive,
  isFullyActive,
  handleMouseEnter,
  handleMouseLeave,
  onFocus,
  onBlur,
}: TechStackIconProps) {
  const isMouseOverRef = useRef(false);

  const handleIconMouseEnter = () => {
    isMouseOverRef.current = true;
    if (isFullyActive) handleMouseEnter();
  };

  const handleIconMouseLeave = () => {
    isMouseOverRef.current = false;
    handleMouseLeave();
  };

  useEffect(() => {
    if (isMouseOverRef.current) {
      if (isFullyActive) {
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }
    }
  }, [isFullyActive, handleMouseEnter, handleMouseLeave]);

  return (
    <Link
      href={icon.href as Route}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-30 flex h-full w-full items-center justify-center focus-visible:z-40 focus-visible:-outline-offset-2"
      aria-label={`Visit ${icon.label} website (opens in new tab)`}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <span className="sr-only">{icon.label} (opens in new tab)</span>
      <div
        className={cn(
          "inline-flex items-center justify-center",
          icon.hoverPaddingClass ?? "p-9",
        )}
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
          onMouseEnter={handleIconMouseEnter}
          onMouseLeave={handleIconMouseLeave}
          animate={{
            backgroundColor: isActive
              ? CSS_VARIABLES.foreground
              : CSS_VARIABLES.background,
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

export default memo(TechStackIcon);
