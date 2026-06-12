"use client";

import Image from "next/image";

import { m } from "motion/react";
import { HOW_I_WORK_WORDS, VIDEO_MAP } from "@/constants/about";
import { useHowIWork } from "@/hooks/useHowIWork";
import WorkWord from "./WorkWord";
import VideoLayer from "./VideoLayer";
import SectionLabel from "@/components/ui/SectionLabel";
import { motionTokens, useAnimations } from "@/utils/motion";

export default function HowIWork() {
  const { entranceVariants } = useAnimations();

  const {
    wordsRef,
    activeWord,
    videoRefs,
    handleWordHover,
    handlePanelMouseEnter,
    handlePanelMouseLeave,
    progressToUse,
    onEndedMap,
  } = useHowIWork();

  return (
    <section
      className="relative z-10 text-background"
      aria-labelledby="how-i-work-heading"
    >
      <SectionLabel
        id="how-i-work-heading"
        as={m.h2}
        variant="section-heading"
        initial="initial"
        whileInView="visible"
        viewport={{ once: true }}
        variants={entranceVariants(
          motionTokens.delay.none,
          motionTokens.distance.base,
          motionTokens.duration.smooth,
        )}
      >
        HOW I WORK
      </SectionLabel>
      <div className="mt-3 flex flex-col gap-10">
        <div className="grid grid-cols-12 gap-4">
          <m.div
            className="relative col-span-9 aspect-16/7 w-full overflow-hidden bg-neutral"
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(
              motionTokens.delay.short,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
          >
            <Image
              src="/how-i-work-hero.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 75vw, 100vw"
              className="object-cover"
              aria-hidden="true"
            />
          </m.div>

          <m.div
            className="relative col-span-3 col-start-10 h-full overflow-hidden"
            onMouseEnter={handlePanelMouseEnter}
            onMouseLeave={handlePanelMouseLeave}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            variants={entranceVariants(
              motionTokens.delay.base,
              motionTokens.distance.base,
              motionTokens.duration.smooth,
            )}
          >
            <m.div
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: activeWord ? 0 : 1 }}
              transition={{
                duration: motionTokens.duration.smooth,
                ease: motionTokens.easing.standard,
              }}
            >
              <Image
                src="/how-i-work-panel.webp"
                alt=""
                fill
                sizes="(min-width: 1280px) 25vw, 100vw"
                className="object-cover"
                aria-hidden="true"
              />
            </m.div>

            {HOW_I_WORK_WORDS.map((word) => (
              <VideoLayer
                key={word}
                src={VIDEO_MAP[word]}
                isActive={activeWord === word}
                videoRef={videoRefs[word]}
                onEnded={onEndedMap[word]}
              />
            ))}
          </m.div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <p className="text-section col-span-6 text-background">
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
                scrollProgress={progressToUse}
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
