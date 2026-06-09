"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCursorContext } from "@/contexts/CursorContext";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import DetailCodeCard from "./DetailCodeCard";

interface DetailImplementationCardProps {
  selectedFile: string | null;
  implementationsCode: Record<string, string>;
  fallbackCode: string;
  className?: string;
}

export default function DetailImplementationCard({
  selectedFile,
  implementationsCode,
  fallbackCode,
  className,
}: DetailImplementationCardProps) {
  const { cursorSize, setColor } = useCursorContext();
  const codeScrollRef = useRef<HTMLDivElement>(null);
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
      if (codeScrollRef.current) {
        codeScrollRef.current.scrollLeft = drag.scrollLeft - dx;
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
    if (codeScrollRef.current) {
      codeScrollRef.current.scrollLeft = 0;
    }
  }, [selectedFile]);

  const handleCodeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const container = codeScrollRef.current;
      if (!container) return;

      const isScrollable = container.scrollWidth > container.clientWidth;
      if (!isScrollable) return;

      const drag = dragRef.current;
      drag.isDragging = true;
      drag.startX = e.clientX;
      drag.scrollLeft = container.scrollLeft;
      cursorSize.set(CURSOR_SIZE.xs);
      setColor(CSS_VARIABLES.accent);
    },
    [cursorSize, setColor],
  );

  const displayFile = selectedFile && implementationsCode[selectedFile] ? selectedFile : "CodePlaceholder.tsx";
  const impl = (selectedFile && implementationsCode[selectedFile]) || fallbackCode;
  const lines = impl ? impl.split("\n") : [];

  return (
    <DetailCodeCard
      label="Implementation"
      description={displayFile}
      className={className}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={displayFile}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex w-full"
        >
          {lines.length > 0 && (
            <>
              <div className="text-right text-(--neutral) text-[10px] leading-relaxed pr-2 shrink-0 select-none">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className="border-l border-(--neutral)/30 mr-2" />
            </>
          )}
          <div
            ref={codeScrollRef}
            onMouseDown={handleCodeMouseDown}
            className="overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-1 select-none"
          >
            <pre className="text-[10px] text-(--neutral) leading-relaxed whitespace-pre w-fit min-w-full">
              {impl}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </DetailCodeCard>
  );
}
