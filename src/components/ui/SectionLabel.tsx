import { type MotionProps } from "motion/react";
import { cn } from "@/utils/cn";
import type { ReactNode, ElementType } from "react";

interface SectionLabelProps extends MotionProps {
  children: ReactNode;
  as?: ElementType;
  tone?: "default" | "dark";
  className?: string;
  [key: string]: unknown;
}

export default function SectionLabel({
  children,
  as: Tag = "span",
  tone = "default",
  className,
  ...motionProps
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        "text-sm uppercase",
        tone === "dark" ? "text-(--neutral-dark)" : "text-(--neutral)",
        className,
      )}
      {...motionProps}
    >
      {children}
    </Tag>
  );
}
