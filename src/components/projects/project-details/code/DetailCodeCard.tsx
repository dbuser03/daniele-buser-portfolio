import { cn } from "@/utils/cn";
import SectionLabel from "@/components/ui/SectionLabel";
import type { ReactNode } from "react";

interface DetailCodeCardProps {
  label?: string;
  children?: ReactNode;
  description?: string;
  className?: string;
}

export default function DetailCodeCard({
  label,
  children,
  description,
  className = "",
}: DetailCodeCardProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-3/4 w-full flex-col gap-4 bg-(--card-dark) p-4",
        className,
      )}
    >
      {label && (
        <div>
          <SectionLabel>{label}</SectionLabel>
        </div>
      )}
      {children && (
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="mt-auto mb-auto">{children}</div>
        </div>
      )}
      {description && (
        <p className="text-sm leading-snug text-(--neutral) shrink-0">
          {description}
        </p>
      )}
    </div>
  );
}
