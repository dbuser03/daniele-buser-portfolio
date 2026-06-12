"use client";

import { useRef, useEffect } from "react";
import { useCursorContext } from "@/components/layout/cursor/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";

export function useDraggableScroll(resetTrigger?: unknown) {
  const { cursorSize, setColor } = useCursorContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    const drag = dragRef.current;
    const onMouseMove = (e: MouseEvent) => {
      if (!drag.isDragging) return;
      const dx = e.clientX - drag.startX;
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = drag.scrollLeft - dx;
      }
    };
    
    const onMouseUp = () => {
      if (drag.isDragging) {
        drag.isDragging = false;
        cursorSize.set(CURSOR_SIZE.sm);
        setColor(CSS_VARIABLES.accent);
      }
    };
    
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [cursorSize, setColor]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [resetTrigger]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    const isScrollable = container.scrollWidth > container.clientWidth;
    if (!isScrollable) return;

    const drag = dragRef.current;
    drag.isDragging = true;
    drag.startX = e.clientX;
    drag.scrollLeft = container.scrollLeft;
    
    cursorSize.set(CURSOR_SIZE.xs);
    setColor(CSS_VARIABLES.accent);
  };

  return {
    scrollRef,
    handleMouseDown,
  };
}
