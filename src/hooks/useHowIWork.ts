/* eslint-disable react-hooks/immutability -- videoRefs uses a stable useMemo-wrapped Record of individual useRef values; immutability rule false-positives on the Record wrapper */
import { useRef, useState, useEffect, useCallback, useMemo, type RefObject } from "react";
import { HOW_I_WORK_SEQUENCE } from "@/constants/about";
import { HoverableWord } from "@/types/about";

export const useHowIWork = () => {
  const obsessRef = useRef<HTMLVideoElement | null>(null);
  const designRef = useRef<HTMLVideoElement | null>(null);
  const codeRef = useRef<HTMLVideoElement | null>(null);
  const shipRef = useRef<HTMLVideoElement | null>(null);

  const videoRefs: Record<HoverableWord, RefObject<HTMLVideoElement | null>> = useMemo(
    () => ({
      Obsess: obsessRef,
      Design: designRef,
      Code: codeRef,
      Ship: shipRef,
    }),
    [],
  );

  const [activeWord, setActiveWord] = useState<HoverableWord | null>(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const sequenceIndexRef = useRef(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playVideo = useCallback((word: HoverableWord) => {
    videoRefs[word].current?.play().catch(() => {});
  }, [videoRefs]);

  const stopVideo = useCallback((word: HoverableWord) => {
    const el = videoRefs[word].current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
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
            const el = videoRefs[word].current;
            if (el) {
              el.currentTime = 0;
              el.play().catch(() => {});
            }
          }
          return word;
        });
      }
    }, 50);
  }, [isImageHovered, stopVideo, videoRefs]);

  const advanceSequence = useCallback(() => {
    sequenceIndexRef.current =
      (sequenceIndexRef.current + 1) % HOW_I_WORK_SEQUENCE.length;
    const nextWord = HOW_I_WORK_SEQUENCE[sequenceIndexRef.current];
    setActiveWord(nextWord);
    const el = videoRefs[nextWord].current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  }, [videoRefs]);

  const startSequence = useCallback(() => {
    sequenceIndexRef.current = 0;
    const firstWord = HOW_I_WORK_SEQUENCE[0];
    setActiveWord(firstWord);
    const el = videoRefs[firstWord].current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  }, [videoRefs]);

  const handlePanelMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsImageHovered(true);
    startSequence();
  }, [startSequence]);

  const handlePanelMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsImageHovered(false);
    const current = HOW_I_WORK_SEQUENCE[sequenceIndexRef.current];
    stopVideo(current);
    setActiveWord(null);
  }, [stopVideo]);

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
