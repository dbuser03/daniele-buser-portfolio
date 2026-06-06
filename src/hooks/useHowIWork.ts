"use client";

import { useRef, useState, useEffect, useCallback, useMemo, type RefObject } from "react";
import { HOW_I_WORK_SEQUENCE } from "@/constants/about";
import { HoverableWord } from "@/types/about";

function getVideoRef(
  word: HoverableWord,
  refs: Record<HoverableWord, RefObject<HTMLVideoElement | null>>,
) {
  return refs[word];
}

export const useHowIWork = () => {
  const obsessRef = useRef<HTMLVideoElement | null>(null);
  const designRef = useRef<HTMLVideoElement | null>(null);
  const codeRef = useRef<HTMLVideoElement | null>(null);
  const shipRef = useRef<HTMLVideoElement | null>(null);

  const videoRefs = useMemo(() => ({
    Obsess: obsessRef,
    Design: designRef,
    Code: codeRef,
    Ship: shipRef,
  }), [obsessRef, designRef, codeRef, shipRef]);

  const [activeWord, setActiveWord] = useState<HoverableWord | null>(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const sequenceIndexRef = useRef(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playVideo = useCallback((word: HoverableWord) => {
    getVideoRef(word, videoRefs).current?.play().catch(() => {});
  }, [videoRefs]);

  const stopVideo = useCallback((word: HoverableWord) => {
    const el = getVideoRef(word, videoRefs).current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, [videoRefs]);

  const resetAndPlay = useCallback((word: HoverableWord) => {
    const el = getVideoRef(word, videoRefs).current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  }, [videoRefs]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleWordHover = useCallback((word: HoverableWord | null) => {
    if (isImageHovered) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      if (word === null) {
        setActiveWord((prev) => {
          if (prev) stopVideo(prev);
          return null;
        });
      } else {
        setActiveWord((prev) => {
          if (prev && prev !== word) stopVideo(prev);
          if (prev !== word) {
            resetAndPlay(word);
          }
          return word;
        });
      }
    }, 50);
  }, [isImageHovered, resetAndPlay, stopVideo]);

  const advanceSequence = () => {
    sequenceIndexRef.current =
      (sequenceIndexRef.current + 1) % HOW_I_WORK_SEQUENCE.length;
    const nextWord = HOW_I_WORK_SEQUENCE[sequenceIndexRef.current];
    setActiveWord(nextWord);
    resetAndPlay(nextWord);
  };

  const startSequence = () => {
    sequenceIndexRef.current = 0;
    const firstWord = HOW_I_WORK_SEQUENCE[0];
    setActiveWord(firstWord);
    resetAndPlay(firstWord);
  };

  const handlePanelMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsImageHovered(true);
    startSequence();
  };

  const handlePanelMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsImageHovered(false);
    const current = HOW_I_WORK_SEQUENCE[sequenceIndexRef.current];
    stopVideo(current);
    setActiveWord(null);
  };

  return {
    activeWord,
    isImageHovered,
    videoRefs,
    handleWordHover,
    handlePanelMouseEnter,
    handlePanelMouseLeave,
    advanceSequence,
    playVideo,
  };
};
