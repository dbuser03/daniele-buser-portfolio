"use client";

import {
  useRef,
  useState,
  useEffect,
  type RefObject,
} from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { HOW_I_WORK_SEQUENCE, HOW_I_WORK_WORDS } from "@/constants/about";
import { motionTokens } from "@/utils/motion";
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

  const videoRefs = {
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
    getVideoRef(word, videoRefs)
      .current?.play()
      .catch(() => {});
  };

  const stopVideo = (word: HoverableWord) => {
    const el = getVideoRef(word, videoRefs).current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const resetAndPlay = (word: HoverableWord) => {
    const el = getVideoRef(word, videoRefs).current;
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

  const wordsRef = useRef<HTMLDivElement | null>(null);

  const scrollYProgress = useMotionValue(0);

  useLenis(() => {
    if (!wordsRef.current) return;
    const rect = wordsRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startY = windowHeight * 0.85;
    const endY = windowHeight * 0.30;

    const progress = (startY - rect.top) / (startY - endY);
    scrollYProgress.set(Math.max(0, Math.min(1, progress)));
  });

  const smoothProgress = useSpring(scrollYProgress, motionTokens.spring.scroll);
  const shouldReduceMotion = useReducedMotion();
  const progressToUse = shouldReduceMotion ? scrollYProgress : smoothProgress;

  const playVideoRef = useRef(playVideo);
  const advanceSequenceRef = useRef(advanceSequence);
  useEffect(() => {
    playVideoRef.current = playVideo;
  });
  useEffect(() => {
    advanceSequenceRef.current = advanceSequence;
  });

  const onEndedMap: Record<string, () => void> = {};
  HOW_I_WORK_WORDS.forEach((w) => {
    onEndedMap[w] = () => {
      if (isImageHovered) {
        advanceSequenceRef.current();
      } else if (activeWord === w) {
        playVideoRef.current(w);
      }
    };
  });

  return {
    wordsRef,
    activeWord,
    isImageHovered,
    videoRefs,
    handleWordHover,
    handlePanelMouseEnter,
    handlePanelMouseLeave,
    progressToUse,
    onEndedMap,
  };
};
