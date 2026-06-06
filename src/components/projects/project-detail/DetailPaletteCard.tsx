import type { ProjectColor } from "@/types/projects";
import { hexToRgbStr } from "@/utils/colors";
import DetailSectionCard from "@/components/projects/project-detail/DetailSectionCard";

interface DetailPaletteCardProps {
  colors: ProjectColor[];
}

export default function DetailPaletteCard({
  colors,
}: DetailPaletteCardProps) {
  return (
    <DetailSectionCard label="Palette">
      <div className="mt-8 flex w-full gap-4 pb-2">
        {colors.map((colorVal) => {
          const hex = colorVal.hex;
          const pantone = colorVal.pantone;
          const rgb = colorVal.rgb || hexToRgbStr(hex);

          return (
            <div key={hex} className="flex flex-1 flex-col">
              <div
                className="h-42 w-full border border-(--foreground)/10 lg:h-50 xl:h-58 2xl:h-66"
                style={{ backgroundColor: hex }}
              />
              <div
                className="mt-8 flex flex-col gap-y-1.5 text-xs leading-none font-normal text-(--foreground) uppercase select-none md:text-sm"
                style={{
                  fontFamily: "var(--font-neue-haas), sans-serif",
                }}
              >
                <span>{hex}</span>
                {rgb && (
                  <span className="text-(--neutral)">RGB {rgb}</span>
                )}
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
