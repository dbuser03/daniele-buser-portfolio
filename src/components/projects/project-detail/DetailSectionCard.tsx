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
      className={`relative flex aspect-4/3 w-full flex-col justify-between overflow-hidden bg-(--card-dark) p-4 ${className}`}
    >
      <div>
        <span className="text-xs tracking-wider text-(--neutral) uppercase select-none md:text-sm">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
