/* eslint-disable react-hooks/immutability */
import { useRef, useState, useCallback, useMemo, type RefObject } from "react";
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

  const playVideo = useCallback((word: HoverableWord) => {
    videoRefs[word].current?.play().catch(() => {});
  }, [videoRefs]);

  const stopVideo = useCallback((word: HoverableWord) => {
    const el = videoRefs[word].current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, [videoRefs]);

  const handleWordHover = useCallback((word: HoverableWord | null) => {
    if (isImageHovered) return;

    if (activeWord) stopVideo(activeWord);
    setActiveWord(word);
    if (word) {
      const el = videoRefs[word].current;
      if (!el) return;
      el.currentTime = 0;
      playVideo(word);
    }
  }, [activeWord, isImageHovered, playVideo, stopVideo, videoRefs]);

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
    setIsImageHovered(true);
    startSequence();
  }, [startSequence]);

  const handlePanelMouseLeave = useCallback(() => {
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
