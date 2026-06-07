"use client";

import { motion } from "motion/react";
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

  const baseDelay = 0.95;

  return (
    <section
      className="relative z-20 flex w-full flex-col gap-0"
      onMouseLeave={handleMouseLeaveTechStack}
      aria-labelledby="tech-stack-heading"
    >
      <motion.h2
        id="tech-stack-heading"
        className="pb-3 text-sm text-(--neutral-dark)"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: baseDelay }}
      >
        MY TECH STACK
      </motion.h2>

      <div className="grid w-full grid-cols-3 gap-0">
        {TECH_STACK_FIRST_ROW_ICONS.map((icon, index) => {
          const cellId = getTechStackCellId("first", index);
          const cellIsActive = hoveredCellId === cellId;
          return (
            <TechStackCell
              key={cellId}
              cellId={cellId}
              className="relative aspect-3/2 min-h-0 bg-(--foreground)"
              onMouseEnter={() => handleCellMouseEnter(cellId)}
              onMouseLeave={handleCellMouseLeave}
              isActive={cellIsActive}
              delay={baseDelay + index * 0.08}
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

      <div className="grid w-full grid-cols-7 gap-0">
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
              delay={baseDelay + index * 0.05}
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
