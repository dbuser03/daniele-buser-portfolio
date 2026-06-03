"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useTransform } from "motion/react";
import {
  aboutTextVariants,
  aboutAnimationConfig,
  aboutDelays,
} from "@/constants/about";
import { useCursorContext } from "@/contexts/CursorContext";
import { useAboutPageScroll } from "@/hooks/layout/cursor/useAboutPageScroll";
import { useTextPosition } from "@/hooks/useTextPosition";
import { useCursorInteraction } from "@/hooks/layout/cursor/useCursorInteraction";
import { ABOUT_PAGE_LABEL } from "@/constants/layout/cursor";

const About: React.FC = () => {
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);

  const { cursorSize, smoothX, smoothY, setLabel, setShowIcon } =
    useCursorContext();
  const textPosition = useTextPosition(textRef);

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("hero");

  useAboutPageScroll(setLabel, isHoveringHero, cursorSize, setShowIcon);

  useEffect(() => {
    setLabel(ABOUT_PAGE_LABEL);
  }, [setLabel]);

  const clipPathRadius = useTransform(cursorSize, (size) => size / 2);

  return (
    <>
      <section className="relative flex min-h-screen max-w-[90rem] items-center justify-center px-2">
        <motion.h1
          ref={textRef}
          className="absolute text-5xl leading-none md:text-7xl lg:text-8xl"
          onMouseEnter={() => {
            setIsHoveringHero(true);
            handleMouseEnter();
          }}
          onMouseLeave={() => {
            setIsHoveringHero(false);
            handleMouseLeave();
          }}
          initial="hidden"
          animate="visible"
          variants={aboutTextVariants}
          transition={{
            ...aboutAnimationConfig,
            delay: aboutDelays.text,
          }}
        >
          I&apos;m a <span className="font-bold">computer science student</span>{" "}
          based in Lugano willing to become an amazing{" "}
          <span className="font-bold">creative developer</span>.
        </motion.h1>
      </section>

      <motion.div
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{
          clipPath: useTransform(
            [clipPathRadius, smoothX, smoothY],
            ([r, x, y]) => `circle(${r}px at ${x}px ${y}px)`,
          ),
        }}
      >
        <motion.h1
          className="fixed text-5xl leading-none md:text-7xl lg:text-8xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ...aboutAnimationConfig,
            delay: aboutDelays.text,
          }}
          style={{
            color: "var(--background)",
            top: textPosition.top,
            left: textPosition.left,
            width: textPosition.width,
          }}
        >
          I&apos;m an average{" "}
          <span className="font-bold">computer science student</span> who enjoys
          borrowing <span className="font-bold">creative ideas</span>. Just like
          this one.
        </motion.h1>
      </motion.div>
    </>
  );
};

export default About;
