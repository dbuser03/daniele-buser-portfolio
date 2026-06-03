import { useRef, useState, type RefObject } from "react";
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

  const playVideo = (word: HoverableWord) => {
    videoRefs[word].current?.play().catch(() => {});
  };

  const stopVideo = (word: HoverableWord) => {
    const el = videoRefs[word].current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const handleWordHover = (word: HoverableWord | null) => {
    if (isImageHovered) return;

    if (activeWord) stopVideo(activeWord);
    setActiveWord(word);
    if (word) {
      const el = videoRefs[word].current;
      if (!el) return;
      el.currentTime = 0;
      playVideo(word);
    }
  };

  const advanceSequence = () => {
    sequenceIndexRef.current =
      (sequenceIndexRef.current + 1) % HOW_I_WORK_SEQUENCE.length;
    const nextWord = HOW_I_WORK_SEQUENCE[sequenceIndexRef.current];
    setActiveWord(nextWord);
    const el = videoRefs[nextWord].current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const startSequence = () => {
    sequenceIndexRef.current = 0;
    const firstWord = HOW_I_WORK_SEQUENCE[0];
    setActiveWord(firstWord);
    const el = videoRefs[firstWord].current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const handlePanelMouseEnter = () => {
    setIsImageHovered(true);
    startSequence();
  };

  const handlePanelMouseLeave = () => {
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
