"use client";

import { useEffect, useRef, memo } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import type { Route } from "next";
import type { TechStackIconConfig } from "@/types/about";
import { motionTokens } from "@/constants/animations";
import { CSS_VARIABLES } from "@/constants/theme";
import { cn } from "@/utils/cn";

interface TechStackIconProps {
  icon: TechStackIconConfig;
  isActive: boolean;
  isFullyActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

function TechStackIcon({
  icon,
  isActive,
  isFullyActive,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  className,
}: TechStackIconProps) {
  const isMouseOverRef = useRef(false);

  const handleIconMouseEnter = () => {
    isMouseOverRef.current = true;
    if (isFullyActive) onMouseEnter();
  };

  const handleIconMouseLeave = () => {
    isMouseOverRef.current = false;
    onMouseLeave();
  };

  useEffect(() => {
    if (isMouseOverRef.current) {
      if (isFullyActive) {
        onMouseEnter();
      } else {
        onMouseLeave();
      }
    }
  }, [isFullyActive, onMouseEnter, onMouseLeave]);

  return (
    <Link
      href={icon.href as Route}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("relative z-30 flex h-full w-full items-center justify-center focus-visible:z-40 focus-visible:-outline-offset-2", className)}
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
            backgroundColor: motionTokens.spring.cell,
          }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

export default memo(TechStackIcon);
