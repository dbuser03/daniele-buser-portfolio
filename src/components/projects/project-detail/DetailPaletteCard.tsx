import type { ProjectColor } from "@/types/projects";
import { hexToRgbStr } from "@/utils/colors";
import DetailSectionCard from "@/components/projects/project-detail/DetailSectionCard";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useState } from "react";
import { motion } from "motion/react";

interface DetailPaletteCardProps {
  colors: ProjectColor[];
}

export default function DetailPaletteCard({ colors }: DetailPaletteCardProps) {
  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("current");
  const [copied, setCopied] = useState<string | null>(null);
  return (
    <DetailSectionCard label="Palette">
      <div className="mt-8 flex w-full gap-4 pb-2">
        {colors.map((colorVal) => {
          const hex = colorVal.hex;
          const pantone = colorVal.pantone;
          const rgb = colorVal.rgb || hexToRgbStr(hex);
          return (
            <div
              key={hex}
              className="flex flex-1 flex-col"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <motion.span
                className="mb-2 text-sm font-normal tracking-wider text-(--neutral-dark) -mt-5"
                style={{ fontFamily: "var(--font-neue-haas), sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: copied === hex ? 1 : 0 }}
              >
                (copied)
              </motion.span>
              <motion.div
                className="h-66 w-full border border-(--foreground)/10"
                style={{ backgroundColor: hex }}
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  navigator.clipboard.writeText(hex);
                  setCopied(hex);
                  setTimeout(() => setCopied(null), 800);
                }}
              />

              <div
                className="mt-8 flex flex-col gap-y-1.5 text-sm leading-none font-normal text-(--foreground) uppercase"
                style={{ fontFamily: "var(--font-neue-haas), sans-serif" }}
              >
                <span>{hex}</span>
                {rgb && <span className="text-(--neutral)">RGB {rgb}</span>}
                {pantone && (
                  <span className="text-(--neutral)">PMS {pantone}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DetailSectionCard>
  );
}
