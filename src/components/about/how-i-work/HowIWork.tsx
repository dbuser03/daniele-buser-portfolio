"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { HOW_I_WORK_WORDS, VIDEO_MAP } from "@/constants/about";
import { useHowIWork } from "@/hooks/useHowIWork";
import WorkWord from "./WorkWord";
import VideoLayer from "./VideoLayer";
import { FADE_UP_TRANSITION, SCROLL_SPRING_CONFIG } from "@/constants/animations";

export default function HowIWork() {
  const wordsRef = useRef<HTMLDivElement | null>(null);
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

  return (
    <section
      className="relative z-10 text-(--background)"
      aria-labelledby="how-i-work-heading"
    >
      <h2
        id="how-i-work-heading"
        className="pb-3 text-xs text-(--neutral-dark) md:text-sm"
      >
        HOW I WORK
      </h2>
      <div className="flex flex-col gap-8 xl:gap-10">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="relative aspect-16/7 w-full overflow-hidden bg-(--neutral) xl:col-span-9">
            <Image
              src="/how-i-work-hero.webp"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 75vw"
              className="object-cover"
              aria-hidden="true"
            />
          </div>

          <div
            className="relative aspect-16/7 overflow-hidden xl:col-span-3 xl:col-start-10 xl:aspect-auto xl:h-full"
            onMouseEnter={handlePanelMouseEnter}
            onMouseLeave={handlePanelMouseLeave}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: activeWord ? 0 : 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Image
                src="/how-i-work-panel.webp"
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 25vw"
                className="object-cover"
                aria-hidden="true"
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
          </div>
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
