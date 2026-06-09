"use client";

import { motion } from "motion/react";
import {
  TECH_STACK_FIRST_ROW_ICONS,
  TECH_STACK_SECOND_ROW_ICONS,
} from "@/constants/about";
import { useTechStack } from "@/hooks/useTechStack";
import { getTechStackCellId } from "@/utils/about";
import SectionLabel from "@/components/ui/SectionLabel";
import TechStackCell from "./TechStackCell";
import TechStackIcon from "./TechStackIcon";
import { motionTokens, entranceVariants, listVariants } from "@/constants/animations";

export default function TechStack() {
  const {
    hoveredCellId,
    fullyHighlightedCellId,
    handleCellMouseEnter,
    handleCellMouseLeave,
    handleMouseLeaveTechStack,
    onCursorEnter,
    onCursorLeave,
  } = useTechStack();

  return (
    <section
      className="relative z-20 flex w-full flex-col gap-0"
      onMouseLeave={handleMouseLeaveTechStack}
      aria-labelledby="tech-stack-heading"
    >
      <SectionLabel
        as={motion.h2}
        id="tech-stack-heading"
        variant="section-heading"
        initial="initial"
        whileInView="visible"
        viewport={{ once: true }}
        variants={entranceVariants(0, 20, motionTokens.duration.smooth)}
      >
        MY TECH STACK
      </SectionLabel>

      <motion.div
        className="mt-3 grid w-full grid-cols-3 gap-0"
        variants={listVariants(0.15, 0.08)}
        initial="initial"
        whileInView="visible"
        viewport={{ once: true }}
      >
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
            >
              <TechStackIcon
                icon={icon}
                isActive={cellIsActive}
                isFullyActive={fullyHighlightedCellId === cellId}
                onMouseEnter={onCursorEnter}
                onMouseLeave={onCursorLeave}
                onFocus={() => handleCellMouseEnter(cellId)}
                onBlur={handleCellMouseLeave}
              />
            </TechStackCell>
          );
        })}
      </motion.div>

      <motion.div
        className="grid w-full grid-cols-7 gap-0"
        variants={listVariants(0.15, 0.05)}
        initial="initial"
        whileInView="visible"
        viewport={{ once: true }}
      >
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
                onMouseEnter={onCursorEnter}
                onMouseLeave={onCursorLeave}
                onFocus={() => handleCellMouseEnter(cellId)}
                onBlur={handleCellMouseLeave}
              />
            </TechStackCell>
          );
        })}
      </motion.div>
    </section>
  );
}
