"use client";

import { motion } from "motion/react";
import { cn } from "../utils/cn";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { PACKAGE_MOTION, SWITCH_THUMB } from "../lib/motion";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
  "aria-label"?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: SwitchProps) {
  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("interactive");

  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-checked={checked ? "" : undefined}
      data-unchecked={!checked ? "" : undefined}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full",
        "border border-(--neutral)/30 outline-none",
        "focus-visible:border-(--accent) focus-visible:ring-3 focus-visible:ring-(--accent)/50",
        "data-checked:bg-(--foreground) data-unchecked:bg-(--neutral)/40",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        size === "md" ? "h-[18px] w-8" : "h-3.5 w-6",
        className,
      )}
    >
      <motion.span
        className={cn(
          "pointer-events-none block rounded-full",
          checked ? "bg-(--neutral-dark)" : "bg-(--neutral)",
          size === "md" ? "size-3.5" : "size-3",
        )}
        animate={{
          x: checked
            ? size === "md"
              ? SWITCH_THUMB.offsetCheckedMd
              : SWITCH_THUMB.offsetCheckedSm
            : SWITCH_THUMB.offsetUnchecked,
        }}
        transition={{ duration: PACKAGE_MOTION.duration.switch, ease: PACKAGE_MOTION.easing.standard }}
      />
    </button>
  );
}
