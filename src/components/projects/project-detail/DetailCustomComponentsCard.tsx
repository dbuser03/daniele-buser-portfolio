import type { ComponentType } from "react";
import DetailSectionCard from "@/components/projects/project-detail/DetailSectionCard";
import { cn } from "@/utils/cn";

interface DetailCustomComponentsCardProps {
  projectId: string;
  CustomComponents: ComponentType;
  className?: string;
}

export default function DetailCustomComponentsCard({
  projectId,
  CustomComponents,
  className,
}: DetailCustomComponentsCardProps) {
  return (
    <DetailSectionCard label="Components" className={cn(className)}>
      <div
        className={`project-theme-${projectId} mt-auto flex max-h-[calc(100%-40px)] w-full flex-col gap-4 overflow-y-auto pr-1 pb-2 text-left`}
      >
        <CustomComponents />
      </div>
    </DetailSectionCard>
  );
}
