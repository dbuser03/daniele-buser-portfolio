import type { ComponentType } from "react";
import DetailDesignCard from "@/components/projects/project-details/design/DetailDesignCard";
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
    <DetailDesignCard label="Components" className={cn(className)}>
      <div
        className={`project-theme-${projectId} mt-auto flex max-h-[calc(100%-40px)] w-full flex-col gap-4 overflow-y-auto pr-1 pb-2 text-left`}
      >
        <CustomComponents />
      </div>
    </DetailDesignCard>
  );
}
