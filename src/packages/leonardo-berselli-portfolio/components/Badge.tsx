"use client";

import { cn } from "@/utils/cn";

type BadgeVariant = "default" | "outline" | "secondary" | "destructive";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-(--foreground) text-(--background) [a]:hover:opacity-90",
  outline:
    "border border-(--foreground)/20 text-(--foreground) [a]:hover:bg-(--foreground)/10",
  secondary: "bg-(--neutral) text-(--background) [a]:hover:opacity-90",
  destructive:
    "bg-(--destructive)/10 text-(--destructive) focus-visible:ring-(--destructive)/20 [a]:hover:bg-(--destructive)/20",
};

export function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1",
        "overflow-hidden border border-transparent px-2 py-0.5",
        "font-mono caption-sm font-normal uppercase",
        "transition-all",
        "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        "[&>svg]:pointer-events-none [&>svg]:size-3",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
