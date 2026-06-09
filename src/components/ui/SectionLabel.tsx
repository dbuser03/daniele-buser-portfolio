import { type MotionProps } from "motion/react";
import { cn } from "@/utils/cn";
import type { ReactNode, ElementType } from "react";

const variantColors = {
  "section-heading": "text-(--neutral-dark)",
  "card-label": "text-(--neutral)",
  inline: "text-(--neutral)",
} as const;

interface SectionLabelProps extends MotionProps {
  children: ReactNode;
  id?: string;
  as?: ElementType;
  variant?: keyof typeof variantColors;
  className?: string;
}

export default function SectionLabel({
  children,
  as: Tag = "span",
  variant = "card-label",
  className,
  ...motionProps
}: SectionLabelProps) {
  return (
    <Tag
      className={cn("text-sm uppercase", variantColors[variant], className)}
      {...motionProps}
    >
      {children}
    </Tag>
  );
}
