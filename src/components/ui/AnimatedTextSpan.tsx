"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { CSS_VARIABLES } from "@/constants/theme";
import { motionTokens } from "@/utils/motion";

interface AnimatedTextSpanProps {
  children: ReactNode;
  isActive?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  hoverColor?: string;
  className?: string;
}

export default function AnimatedTextSpan({
  children,
  isActive = false,
  activeColor = CSS_VARIABLES.foreground,
  inactiveColor = CSS_VARIABLES.neutral,
  hoverColor = CSS_VARIABLES.foreground,
  className,
}: AnimatedTextSpanProps) {
  return (
    <m.span
      animate={{ color: isActive ? activeColor : inactiveColor }}
      whileHover={{ color: hoverColor }}
      transition={{
        duration: motionTokens.duration.base,
        ease: motionTokens.easing.standard,
      }}
      className={className}
    >
      {children}
    </m.span>
  );
}
