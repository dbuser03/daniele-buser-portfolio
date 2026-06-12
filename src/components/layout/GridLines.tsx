import { cn } from "@/utils/cn";

const VISIBILITY_BREAKPOINTS = [
  "",
  "sm:block",
  "md:block",
  "lg:block",
  "xl:block",
] as const;

interface GridLinesProps {
  variant?: "light" | "dark";
}

export default function GridLines({ variant = "dark" }: GridLinesProps) {
  return (
    <div className="grid size-full grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
      {Array.from({ length: 12 }).map((_, index) => {
        const visibilityIndex = Math.min(
          Math.max(0, Math.floor((index - 2) / 2)),
          VISIBILITY_BREAKPOINTS.length - 1,
        );
        const visibility = VISIBILITY_BREAKPOINTS[visibilityIndex];
        return (
          <div
            key={index}
            className={cn(
              "relative h-full border-x border-solid",
              variant === "light"
                ? "border-grid-line-light"
                : "border-grid-line-dark",
              visibility && `hidden ${visibility}`,
            )}
          />
        );
      })}
    </div>
  );
}
