"use client";

import Image from "next/image";
import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { HOW_I_WORK_WORDS, VIDEO_MAP } from "@/constants/about";
import { useHowIWork } from "@/hooks/useHowIWork";
import WorkWord from "./WorkWord";
import VideoLayer from "./VideoLayer";
import Skeleton from "@/components/ui/Skeleton";
import SectionLabel from "@/components/ui/SectionLabel";
import { SCROLL_SPRING_CONFIG } from "@/constants/animations";

export default function HowIWork() {
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [isPanelLoading, setIsPanelLoading] = useState(true);
  const {
    activeWord,
    isImageHovered,
    videoRefs,
    handleWordHover,
    handlePanelMouseEnter,
    handlePanelMouseLeave,
    advanceSequence,
    playVideo,
  } = useHowIWork();

  const { scrollYProgress } = useScroll({
    target: wordsRef,
    offset: ["start 85%", "start 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING_CONFIG);

  const playVideoRef = useRef(playVideo);
  const advanceSequenceRef = useRef(advanceSequence);
  useEffect(() => {
    playVideoRef.current = playVideo;
  });
  useEffect(() => {
    advanceSequenceRef.current = advanceSequence;
  });

  const onEndedMap = useMemo(() => {
    const map: Record<string, () => void> = {};
    HOW_I_WORK_WORDS.forEach((w) => {
      map[w] = () => {
        if (isImageHovered) {
          advanceSequenceRef.current();
        } else if (activeWord === w) {
          playVideoRef.current(w);
        }
      };
    });
    return map;
  }, [isImageHovered, activeWord]);

  const baseDelay = 0.95;

  return (
    <section
      className="relative z-10 text-(--background)"
      aria-labelledby="how-i-work-heading"
    >
      <SectionLabel
        id="how-i-work-heading"
        as={motion.h2}
        tone="dark"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: baseDelay }}
      >
        HOW I WORK
      </SectionLabel>
      <div className="mt-3 flex flex-col gap-10">
        <div className="grid grid-cols-12 gap-4">
          <motion.div
            className="relative col-span-9 aspect-16/7 w-full overflow-hidden bg-(--neutral)"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: baseDelay }}
          >
            <Skeleton isLoading={isHeroLoading} variant="on-light" />
            <Image
              src="/how-i-work-hero.webp"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 75vw"
              className="object-cover"
              aria-hidden="true"
              onLoad={() => setIsHeroLoading(false)}
            />
          </motion.div>

          <motion.div
            className="relative col-span-3 col-start-10 aspect-16/7 h-full overflow-hidden"
            onMouseEnter={handlePanelMouseEnter}
            onMouseLeave={handlePanelMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
              delay: baseDelay + 0.08,
            }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: activeWord ? 0 : 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Skeleton isLoading={isPanelLoading} variant="on-light" />
              <Image
                src="/how-i-work-panel.webp"
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 25vw"
                className="object-cover"
                aria-hidden="true"
                onLoad={() => setIsPanelLoading(false)}
              />
            </motion.div>

            {HOW_I_WORK_WORDS.map((word) => (
              <VideoLayer
                key={word}
                src={VIDEO_MAP[word]}
                active={activeWord === word}
                videoRef={videoRefs[word]}
                onEnded={onEndedMap[word]}
              />
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <p className="text-section col-span-6 text-(--background)">
            Most of my time goes into the parts nobody sees — decisions,
            tradeoffs, things that get cut. What ships is what survives that
            process. I handle design and development together, which means
            faster decisions and fewer misunderstandings.
          </p>
          <div
            ref={wordsRef}
            className="col-span-3 col-start-10 flex flex-col items-start gap-1"
          >
            {HOW_I_WORK_WORDS.map((word, index) => (
              <WorkWord
                key={word}
                word={word}
                index={index}
                scrollProgress={smoothProgress}
                isActive={activeWord === word}
                onHover={handleWordHover}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
