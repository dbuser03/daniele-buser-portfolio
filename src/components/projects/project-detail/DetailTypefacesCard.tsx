import { cn } from "@/utils/cn";
import type { ProjectFont } from "@/types/projects";
import DetailSectionCard from "@/components/projects/project-detail/DetailSectionCard";

const DEFAULT_FONTS: ProjectFont[] = [
  {
    name: "Neue Haas Grotesk",
    type: "sans",
    weights: [
      { name: "Light 300", value: 300 },
      { name: "Regular 400", value: 400 },
      { name: "Bold 700", value: 700 },
    ],
  },
];

const getFontFamily = (font: ProjectFont) =>
  font.name === "Neue Haas Grotesk"
    ? "var(--font-neue-haas), sans-serif"
    : `'${font.name}', var(--font-neue-haas), ${font.type === "mono" ? "monospace" : "sans-serif"}`;

interface DetailTypefacesCardProps {
  fonts: ProjectFont[];
}

export default function DetailTypefacesCard({
  fonts,
}: DetailTypefacesCardProps) {
  const displayFonts = fonts.length > 0 ? fonts : DEFAULT_FONTS;
  const gridCols =
    displayFonts.length > 1 ? "grid-cols-2" : "grid-cols-1";

  return (
    <DetailSectionCard label="Typefaces">
      <div className={cn("grid w-full gap-4 pb-2 pl-2", gridCols)}>
        {displayFonts.map((font) => (
          <div
            key={font.name}
            className="flex flex-col items-start justify-end"
          >
            <span
              className="text-[10rem] leading-none font-normal text-(--neutral) lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]"
              style={{ fontFamily: getFontFamily(font) }}
            >
              {font.sampleText || "Aa"}
            </span>
            <span
              className="-mt-3 text-xs font-normal tracking-wider text-(--neutral-dark) md:-mt-5 md:text-sm"
              style={{
                fontFamily: "var(--font-neue-haas), sans-serif",
              }}
            >
              {font.type}
            </span>
            <span
              className="mt-1 text-xl leading-[0.95] font-normal whitespace-nowrap text-(--foreground) sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
              style={{
                fontFamily: getFontFamily(font),
                letterSpacing: font.type === "mono" ? "-0.05em" : "-0.02em",
              }}
            >
              {font.name}
            </span>
            <div className="mt-8 flex flex-col gap-y-1.5 text-xs leading-none text-(--foreground) md:text-sm">
              {(font.weights || []).map((weight) => (
                <span
                  key={weight.name}
                  style={{
                    fontFamily: getFontFamily(font),
                    fontWeight: weight.value,
                  }}
                >
                  {weight.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DetailSectionCard>
  );
}
