"use client";
import type { ComponentType } from "react";
import { Download } from "lucide-react";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { toKebabCase } from "@/utils/string";
import AnimatedTextSpan from "@/components/ui/AnimatedTextSpan";
import SectionLabel from "@/components/ui/SectionLabel";

interface DetailCoolShitCardProps {
  CoolShitComponent: ComponentType;
  projectId: string;
  coolShitName: string;
}

export default function DetailCoolShitCard({
  CoolShitComponent,
  projectId,
  coolShitName,
}: DetailCoolShitCardProps) {
  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("interactive");

  return (
    <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-(--card-dark)">
      <SectionLabel className="absolute top-4 left-4 z-10">
        Cool S***t
      </SectionLabel>
      <div className="flex h-full w-full items-center justify-center">
        <CoolShitComponent />
      </div>
      <a
        href={`/projects/${projectId}/${toKebabCase(coolShitName)}.zip`}
        download
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute right-4 bottom-4 z-10 text-(--neutral)"
        aria-label="Download component"
      >
        <AnimatedTextSpan>
          <Download size={20} strokeWidth={1.5} />
        </AnimatedTextSpan>
      </a>
    </div>
  );
}
