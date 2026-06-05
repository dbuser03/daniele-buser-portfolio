"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { inView } from "motion";
import { ABOUT_HEY_ID } from "../Hey";
import { ABOUT_INTRO_ID } from "../AboutIntro";
import { HOW_I_WORK_WORDS, VIDEO_MAP } from "@/constants/about";
import { useHowIWork } from "@/hooks/useHowIWork";
import WorkWord from "./WorkWord";
import VideoLayer from "./VideoLayer";
import Skeleton from "@/components/ui/Skeleton";
import { FADE_UP_TRANSITION, SCROLL_SPRING_CONFIG } from "@/constants/animations";

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

  const [isIntroInView, setIsIntroInView] = useState(() => {
    if (typeof window === "undefined") return true;
    const heyEl = document.getElementById(ABOUT_HEY_ID);
    const introEl = document.getElementById(ABOUT_INTRO_ID);
    
    const isHeyVisible = heyEl 
      ? heyEl.getBoundingClientRect().bottom > 50 && heyEl.getBoundingClientRect().top < window.innerHeight 
      : false;
      
    const isIntroVisible = introEl 
      ? introEl.getBoundingClientRect().bottom > 180 && introEl.getBoundingClientRect().top < window.innerHeight 
      : false;

    return isHeyVisible || isIntroVisible;
  });

  useEffect(() => {
    const checkVisibility = () => {
      const heyEl = document.getElementById(ABOUT_HEY_ID);
      const introEl = document.getElementById(ABOUT_INTRO_ID);
      
      const isHeyVisible = heyEl 
        ? heyEl.getBoundingClientRect().bottom > 50 && heyEl.getBoundingClientRect().top < window.innerHeight 
        : false;
        
      const isIntroVisible = introEl 
        ? introEl.getBoundingClientRect().bottom > 180 && introEl.getBoundingClientRect().top < window.innerHeight 
        : false;

      setIsIntroInView(isHeyVisible || isIntroVisible);
    };

    const unsubHey = inView(`#${ABOUT_HEY_ID}`, () => {
      setIsIntroInView(true);
      return () => checkVisibility();
    });

    const unsubIntro = inView(`#${ABOUT_INTRO_ID}`, () => {
      setIsIntroInView(true);
      return () => checkVisibility();
    });

    checkVisibility();

    return () => {
      unsubHey();
      unsubIntro();
    };
  }, []);

  const baseDelay = isIntroInView ? 0.95 : 0.15;

  return (
    <section
      className="relative z-10 text-(--background)"
      aria-labelledby="how-i-work-heading"
    >
      <motion.h2
        id="how-i-work-heading"
        className="pb-3 text-xs text-(--neutral-dark) md:text-sm"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: baseDelay }}
      >
        HOW I WORK
      </motion.h2>
      <div className="flex flex-col gap-8 xl:gap-10">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <motion.div
            className="relative aspect-16/7 w-full overflow-hidden bg-(--neutral) xl:col-span-9"
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
            className="relative aspect-16/7 overflow-hidden xl:col-span-3 xl:col-start-10 xl:aspect-auto xl:h-full"
            onMouseEnter={handlePanelMouseEnter}
            onMouseLeave={handlePanelMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: baseDelay + 0.08 }}
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
                onEnded={() => {
                  if (isImageHovered) {
                    advanceSequence();
                  } else if (activeWord === word) {
                    playVideo(word);
                  }
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-4">
          <motion.p
            className="text-xl leading-tight text-(--background) sm:text-2xl md:text-3xl md:leading-none xl:col-span-6 xl:text-3xl 2xl:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: false,
              amount: "some",
              margin: "-10% 0px -20% 0px",
            }}
            transition={FADE_UP_TRANSITION}
          >
            Most of my time goes into the parts nobody sees — decisions,
            tradeoffs, things that get cut. What ships is what survives that
            process. I handle design and development together, which means
            faster decisions and fewer misunderstandings.
          </motion.p>
          <div
            ref={wordsRef}
            className="flex flex-col gap-1 xl:col-span-3 xl:col-start-10 xl:items-start"
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
