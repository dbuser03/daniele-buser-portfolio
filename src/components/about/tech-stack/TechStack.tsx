"use client";

import {
  TECH_STACK_FIRST_ROW_ICONS,
  TECH_STACK_SECOND_ROW_ICONS,
} from "@/constants/about";
import { useTechStack } from "@/hooks/useTechStack";
import { getTechStackCellId } from "@/utils/about";
import TechStackCell from "./TechStackCell";
import TechStackIcon from "./TechStackIcon";

export default function TechStack() {
  const {
    hoveredCellId,
    fullyHighlightedCellId,
    handleCellMouseEnter,
    handleCellMouseLeave,
    handleMouseLeaveTechStack,
    handleMouseEnter,
    handleMouseLeave,
  } = useTechStack();

  return (
    <section
      className="relative z-20 flex w-full flex-col gap-0"
      onMouseLeave={handleMouseLeaveTechStack}
      aria-labelledby="tech-stack-heading"
    >
      <h2
        id="tech-stack-heading"
        className="pb-3 text-xs text-(--neutral-dark) md:text-sm"
      >
        MY TECH STACK
      </h2>

      <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-3">
        {TECH_STACK_FIRST_ROW_ICONS.map((icon, index) => {
          const cellId = getTechStackCellId("first", index);
          const cellIsActive = hoveredCellId === cellId;
          return (
            <TechStackCell
              key={cellId}
              cellId={cellId}
              className="relative min-h-44 bg-(--foreground) lg:aspect-3/2 lg:min-h-0"
              onMouseEnter={() => handleCellMouseEnter(cellId)}
              onMouseLeave={handleCellMouseLeave}
              isActive={cellIsActive}
            >
              <TechStackIcon
                icon={{
                  ...icon,
                  hoverPaddingClass: icon.hoverPaddingClass ?? "p-8 sm:p-12",
                }}
                isActive={cellIsActive}
                isFullyActive={fullyHighlightedCellId === cellId}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                onFocus={() => handleCellMouseEnter(cellId)}
                onBlur={handleCellMouseLeave}
              />
            </TechStackCell>
          );
        })}
      </div>

      <div className="grid w-full grid-cols-2 gap-0 sm:grid-cols-4 lg:grid-cols-7">
        {Array.from({ length: 7 }, (_, index) => {
          const cellId = getTechStackCellId("second", index);
          const icon = TECH_STACK_SECOND_ROW_ICONS.find(
            (item) => item.cellIndex === index,
          )?.icon;

          if (!icon) return null;

          const cellIsActive = hoveredCellId === cellId;

          return (
            <TechStackCell
              key={cellId}
              cellId={cellId}
              className="relative aspect-square bg-(--foreground)"
              onMouseEnter={() => handleCellMouseEnter(cellId)}
              onMouseLeave={handleCellMouseLeave}
              isActive={cellIsActive}
            >
              <TechStackIcon
                icon={icon}
                isActive={cellIsActive}
                isFullyActive={fullyHighlightedCellId === cellId}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                onFocus={() => handleCellMouseEnter(cellId)}
                onBlur={handleCellMouseLeave}
              />
            </TechStackCell>
          );
        })}
      </div>
    </section>
  );
}
