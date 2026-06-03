import { useRef, useState } from "react";
import { useCursorContext } from "@/contexts/CursorContext";
import { CURSOR_SIZE } from "@/constants/layout/cursor";
import { EMAIL_COPY_DURATIONS } from "@/constants/contacts";

export const useEmailCopy = (email: string) => {
  const [hasCopied, setHasCopied] = useState(false);
  const labelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setIconType, setLabel, cursorSize, setColor, setShowIcon } =
    useCursorContext();

  const handleEmailEnter = () => {
    cursorSize.set(CURSOR_SIZE.lg);
    setColor("var(--accent)");
    setLabel("");
    setShowIcon(true);
    setIconType("copy");
  };

  const handleEmailLeave = () => {
    cursorSize.set(CURSOR_SIZE.sm);
    setColor("var(--accent)");

    if (hasCopied) {
      setLabel("[ Email copied to clipboard ]");

      if (labelTimeoutRef.current) {
        clearTimeout(labelTimeoutRef.current);
      }

      labelTimeoutRef.current = setTimeout(() => {
        setLabel("");
        labelTimeoutRef.current = null;
      }, EMAIL_COPY_DURATIONS.labelDisplay);
    } else {
      setLabel("");
    }

    setShowIcon(false);
    setIconType("touch");
  };

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIconType("check");
      setHasCopied(true);

      if (labelTimeoutRef.current) {
        clearTimeout(labelTimeoutRef.current);
        labelTimeoutRef.current = null;
      }

      setTimeout(() => {
        setIconType("copy");
      }, EMAIL_COPY_DURATIONS.checkIconDisplay);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return {
    handleEmailEnter,
    handleEmailLeave,
    handleEmailClick,
    hasCopied,
  };
};
