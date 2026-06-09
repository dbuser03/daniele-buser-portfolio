"use client";
import type { ComponentType } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/utils/cn";

interface DetailCoolShitCardProps {
  CoolShitComponent: ComponentType;
  className?: string;
}

export default function DetailCoolShitCard({
  CoolShitComponent,
  className,
}: DetailCoolShitCardProps) {
  return (
    <div className={cn("relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-(--card-dark)", className)}>
      <SectionLabel className="absolute top-4 left-4 z-10">
        Cool S***t
      </SectionLabel>
      <div className="flex h-full w-full items-center justify-center">
        <CoolShitComponent />
      </div>
    </div>
  );
}
