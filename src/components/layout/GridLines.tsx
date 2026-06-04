import { cn } from "@/utils/cn";
import type { GridProps } from "@/types/grid";

export default function GridLines({ variant = "dark" }: GridProps) {
  return (
    <div className="grid h-full w-full grid-cols-4 gap-4 md:grid-cols-8 xl:grid-cols-12">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "relative h-full border-x border-solid",
            variant === "light"
              ? "border-(--grid-line-light)"
              : "border-(--grid-line-dark)",
            index >= 4 && "hidden md:block",
            index >= 8 && "md:hidden xl:block",
          )}
        />
      ))}
    </div>
  );
}
