"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HeroTitleStatic } from "@/components/ui/HeroTitle";
import GridLines from "@/components/layout/GridLines";
import { FADE_UP_BUTTON, FADE_UP_PARAGRAPH } from "@/constants/animations";
import { CSS_VARIABLES } from "@/constants/theme";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

const MotionLink = motion(Link);

export default function NotFound() {
  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("current");

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative z-10 flex min-h-screen flex-col justify-center bg-(--background) text-(--foreground) px-4 focus:outline-none"
      aria-label="404 page main content"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 mx-4"
        aria-hidden="true"
      >
        <GridLines variant="dark" />
      </div>

      <div className="relative z-10 grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-0 text-center">
            <HeroTitleStatic
              text="404"
              className="text-(--foreground)"
              ariaLabel="404 - Page not found"
              delay={0.2}
              duration={0.8}
            />
            <motion.p
              variants={FADE_UP_PARAGRAPH}
              initial="initial"
              animate="visible"
              className="text-sm text-(--neutral) tracking-wide -mt-3"
            >
              This page doesn&apos;t exist.
            </motion.p>
          </div>
          <motion.div
            variants={FADE_UP_BUTTON}
            initial="initial"
            animate="visible"
          >
            <MotionLink
              href="/"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              whileHover={{ backgroundColor: CSS_VARIABLES.foreground, color: CSS_VARIABLES.background }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-sm border border-(--foreground) bg-(--background) px-5 py-2.5 text-xs font-normal uppercase tracking-wider text-(--foreground)"
            >
              Go home
            </MotionLink>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
