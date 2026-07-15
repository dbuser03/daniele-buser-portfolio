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
        "relative flex aspect-auto md:aspect-3/4 w-full flex-col gap-12 bg-card-dark p-4",
        className,
      )}
    >
      {label && (
        <div>
          <SectionLabel>{label}</SectionLabel>
        </div>
      )}
      {children && (
        <div className="flex flex-none md:flex-1 md:min-h-0 scrollbar-none flex-col overflow-visible md:overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-col w-full h-full">{children}</div>
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
