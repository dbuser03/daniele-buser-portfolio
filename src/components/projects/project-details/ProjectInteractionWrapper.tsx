"use client";

import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useCursorContext } from "@/components/layout/cursor/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";
import { InteractionProvider, type InteractionType } from "@case-studies/leonardo-berselli/src/context/InteractionProvider";

export function ProjectInteractionWrapper({ children }: { children: React.ReactNode }) {
  const interactiveCursor = useCursorInteraction("interactive");
  const pulseCursor = useCursorInteraction("pulse");
  const { cursorSize, setColor } = useCursorContext();

  return (
    <InteractionProvider
      value={{
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
          setColor("#ff4500");
        },
        onDragEnd: () => {
          pulseCursor.startPulse();
        },
      }}
    >
      {children}
    </InteractionProvider>
  );
}
