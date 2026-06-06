import type { ComponentType } from "react";
import DetailSectionCard from "@/components/projects/project-detail/DetailSectionCard";

interface DetailCustomComponentsCardProps {
  projectId: string;
  CustomComponents: ComponentType;
}

export default function DetailCustomComponentsCard({
  projectId,
  CustomComponents,
}: DetailCustomComponentsCardProps) {
  return (
    <DetailSectionCard label="Components">
      <div
        className={`project-theme-${projectId} mt-auto flex max-h-[calc(100%-40px)] w-full flex-col gap-4 overflow-y-auto pr-1 pb-2 text-left`}
      >
        <CustomComponents />
      </div>
    </DetailSectionCard>
  );
}
