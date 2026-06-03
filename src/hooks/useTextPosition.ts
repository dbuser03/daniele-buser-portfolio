import { useState, useEffect, useCallback, RefObject } from "react";
import { TextPosition } from "@/types/about";

export const useTextPosition = (
  textRef: RefObject<HTMLHeadingElement | null>,
) => {
  const [textPosition, setTextPosition] = useState<TextPosition>({
    top: 0,
    left: 0,
    width: 0,
  });

  const updateTextPosition = useCallback(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setTextPosition({ top: rect.top, left: rect.left, width: rect.width });
    }
  }, [textRef]);

  useEffect(() => {
    window.addEventListener("resize", updateTextPosition);
    window.addEventListener("scroll", updateTextPosition);

    updateTextPosition();

    const animationFrame = requestAnimationFrame(function update() {
      updateTextPosition();
      requestAnimationFrame(update);
    });

    return () => {
      window.removeEventListener("resize", updateTextPosition);
      window.removeEventListener("scroll", updateTextPosition);
      cancelAnimationFrame(animationFrame);
    };
  }, [updateTextPosition]);

  return textPosition;
};
