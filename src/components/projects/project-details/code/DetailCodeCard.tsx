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
        "relative flex aspect-3/4 w-full flex-col gap-12 bg-card-dark p-4",
        className,
      )}
    >
      {label && (
        <div>
          <SectionLabel>{label}</SectionLabel>
        </div>
      )}
      {children && (
        <div className="flex min-h-0 flex-1 scrollbar-none flex-col overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col w-full min-h-full">{children}</div>
        </div>
      )}
      {description && (
        <p className="shrink-0 text-body text-neutral">
          {description}
        </p>
      )}
    </div>
  );
}
