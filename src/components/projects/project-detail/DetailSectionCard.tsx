import { cn } from "@/utils/cn";
import SectionLabel from "@/components/ui/SectionLabel";
import type { ReactNode } from "react";

interface DetailSectionCardProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export default function DetailSectionCard({
  label,
  children,
  className = "",
}: DetailSectionCardProps) {
  return (
    <div
      className={cn("relative flex aspect-4/3 w-full flex-col justify-between overflow-hidden bg-(--card-dark) p-4", className)}
    >
      <div>
        <SectionLabel>{label}</SectionLabel>
      </div>
      {children}
    </div>
  );
}
