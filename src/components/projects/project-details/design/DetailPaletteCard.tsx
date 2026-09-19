import type { ProjectColor } from "@/types/projects";
import { hexToRgbStr } from "@/utils/colors";
import DetailDesignCard from "@/components/projects/project-details/design/DetailDesignCard";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useEffect, useRef, useState } from "react";
import { m } from "motion/react";
import { cn } from "@/utils/cn";
import { motionTokens } from "@/utils/motion";

interface DetailPaletteCardProps {
  colors: ProjectColor[];
  className?: string;
}

export default function DetailPaletteCard({
  colors,
  className,
}: DetailPaletteCardProps) {
  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("current");
  const [copied, setCopied] = useState<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  return (
    <DetailDesignCard label="Palette" className={cn(className)}>
      <div className="mt-8 flex w-full gap-4 pb-2">
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? `Copied ${copied} to clipboard` : ""}
        </span>
        {colors.map((colorVal) => {
          const hex = colorVal.hex;
          const pantone = colorVal.pantone;
          const rgb = colorVal.rgb || hexToRgbStr(hex);
          return (
            <div key={hex} className="flex flex-1 flex-col">
              <m.span
                className="-mt-5 mb-2 text-body font-normal text-neutral-dark"
                initial={{ opacity: 0 }}
                animate={{ opacity: copied === hex ? 1 : 0 }}
                transition={{
                  duration: motionTokens.duration.fast,
                  ease: motionTokens.easing.standard,
                }}
                aria-hidden="true"
              >
                (copied)
              </m.span>
              <m.button
                type="button"
                aria-label={`Copy color ${hex} to clipboard`}
                className="h-66 w-full cursor-pointer border border-foreground/10 focus-visible:outline-2 focus-visible:outline-accent"
                style={{ backgroundColor: hex }}
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.94 }}
                transition={{
                  duration: motionTokens.duration.base,
                  ease: motionTokens.easing.standard,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  if (copyTimeoutRef.current)
                    clearTimeout(copyTimeoutRef.current);
                  navigator.clipboard.writeText(hex);
                  setCopied(hex);
                  copyTimeoutRef.current = setTimeout(
                    () => setCopied(null),
                    800,
                  );
                }}
              />

              <div className="mt-8 flex flex-col gap-y-1.5 text-body font-normal text-foreground uppercase">
                <span>{hex}</span>
                {rgb && <span className="text-neutral">RGB {rgb}</span>}
                {pantone && (
                  <span className="text-neutral">PMS {pantone}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DetailDesignCard>
  );
}
