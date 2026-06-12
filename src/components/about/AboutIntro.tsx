"use client";

import { useMemo } from "react";
import { m } from "motion/react";

import { motionTokens, useAnimations } from "@/utils/motion";

export const ABOUT_INTRO_ID = "about-intro-paragraph";

export default function AboutIntro({ age }: { age: number }) {
  const { entranceVariants } = useAnimations();

  const introVariants = useMemo(
    () => entranceVariants(motionTokens.delay.long, motionTokens.distance.base, motionTokens.duration.smooth),
    [entranceVariants],
  );

  return (
    <m.p
      id={ABOUT_INTRO_ID}
      className="text-section text-background"
      variants={introVariants}
      initial="initial"
      animate="visible"
    >
      I&apos;m a {age ?? "..."}-year-old Swiss creative developer, who crafts
      web and mobile products where design and code work as one. I enjoy taking
      the lead on projects because, honestly, someone has to.
    </m.p>
  );
}
