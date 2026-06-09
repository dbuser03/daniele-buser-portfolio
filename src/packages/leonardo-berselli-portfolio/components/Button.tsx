"use client";

import { motion } from "motion/react";
import { cn } from "../utils/cn";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { PACKAGE_MOTION } from "../lib/motion";

type ButtonVariant = "default" | "outline" | "secondary" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-(--foreground) text-(--background) hover:opacity-90",
  outline:
    "border border-(--foreground)/20 bg-transparent text-(--foreground) hover:bg-(--foreground)/10",
  secondary:
    "bg-(--neutral) text-(--background) hover:opacity-90",
  destructive:
    "bg-(--destructive)/10 text-(--destructive) hover:bg-(--destructive)/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-6 gap-1 px-2 text-xs",
  md: "h-8 gap-1.5 px-3 text-sm",
  lg: "h-9 gap-1.5 px-3.5 text-sm",
};

export function Button({
  variant = "default",
  size = "md",
  className,
  children,
  disabled,
  onClick,
}: ButtonProps) {
  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("interactive");

  return (
    <motion.button
      className={cn(
        "group/button inline-flex shrink-0 items-center justify-center border border-transparent",
        "font-mono text-xs font-medium uppercase tracking-wider",
        "outline-none transition-all select-none",
        "focus-visible:border-(--accent) focus-visible:ring-3 focus-visible:ring-(--accent)/50",
        "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: PACKAGE_MOTION.duration.tap, ease: PACKAGE_MOTION.easing.standard }}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.button>
  );
}
