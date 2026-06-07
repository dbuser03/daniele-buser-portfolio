"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { CSS_VARIABLES } from "@/constants/theme";
import { EASE_OUT } from "@/constants/animations";

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
    <motion.span
      animate={{ color: isActive ? activeColor : inactiveColor }}
      whileHover={{ color: hoverColor }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
