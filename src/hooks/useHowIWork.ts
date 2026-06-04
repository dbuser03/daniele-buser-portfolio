import { useRef, useState, useEffect, type RefObject } from "react";
import { HOW_I_WORK_SEQUENCE } from "@/constants/about";
import { HoverableWord } from "@/types/about";
export const useHowIWork = () => {
  const obsessRef = useRef<HTMLVideoElement | null>(null);
  const designRef = useRef<HTMLVideoElement | null>(null);
  const codeRef = useRef<HTMLVideoElement | null>(null);
  const shipRef = useRef<HTMLVideoElement | null>(null);

  const videoRefs: Record<HoverableWord, RefObject<HTMLVideoElement | null>> = {
    Obsess: obsessRef,
    Design: designRef,
    Code: codeRef,
    Ship: shipRef,
  };

  const [activeWord, setActiveWord] = useState<HoverableWord | null>(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const sequenceIndexRef = useRef(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const playVideo = (word: HoverableWord) => {
    videoRefs[word].current?.play().catch(() => {});
  };

  const stopVideo = (word: HoverableWord) => {
    const el = videoRefs[word].current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const resetAndPlay = (word: HoverableWord) => {
    const el = videoRefs[word].current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleWordHover = (word: HoverableWord | null) => {
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
  };

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
