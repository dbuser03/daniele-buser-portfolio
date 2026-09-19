"use client";

import { useMemo } from "react";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useCursorContext } from "@/components/layout/cursor/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import {
  InteractionProvider,
  type InteractionType,
} from "@case-studies/leonardo-berselli";

export function ProjectInteractionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const interactiveCursor = useCursorInteraction("interactive");
  const pulseCursor = useCursorInteraction("pulse");
  const { cursorSize, setColor } = useCursorContext();

  const interactionValue = useMemo(
    () => ({
      onHoverStart: (type: InteractionType) => {
        if (type === "pulse") pulseCursor.handleMouseEnter();
        else interactiveCursor.handleMouseEnter();
      },
      onHoverEnd: () => {
        interactiveCursor.handleMouseLeave();
        pulseCursor.handleMouseLeave();
      },
      onDragStart: () => {
        pulseCursor.stopPulse();
        cursorSize.set(CURSOR_SIZE.xs);
        setColor(CSS_VARIABLES.accent);
      },
      onDragEnd: () => {
        pulseCursor.startPulse();
      },
    }),
    [interactiveCursor, pulseCursor, cursorSize, setColor],
  );

  return (
    <InteractionProvider value={interactionValue}>
      {children}
    </InteractionProvider>
  );
}
