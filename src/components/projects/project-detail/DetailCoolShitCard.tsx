import type { ComponentType } from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { toKebabCase } from "@/utils/string";

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
    useCursorInteraction("header");

  return (
    <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-(--card-dark)">
      <span className="absolute top-4 left-4 z-10 text-xs tracking-wider text-(--neutral) uppercase md:text-sm">
        Cool S***t
      </span>
      <div className="flex h-full w-full items-center justify-center">
        <CoolShitComponent />
      </div>
      <a
        href={`/projects/${projectId}/${toKebabCase(coolShitName)}.zip`}
        download
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute right-4 bottom-4 z-10 text-(--neutral) focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm"
        aria-label="Download component"
      >
        <motion.span
          animate={{ color: "var(--neutral)" }}
          whileHover={{ color: "var(--foreground)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Download size={20} strokeWidth={1.5} />
        </motion.span>
      </a>
    </div>
  );
}
