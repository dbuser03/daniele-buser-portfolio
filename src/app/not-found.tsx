"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { HeroTitleStatic } from "@/components/ui/HeroTitle";
import GridLines from "@/components/layout/GridLines";
import { createFadeUpVariants } from "@/constants/animations";

export default function NotFound() {
  const paragraphVariants = useMemo(
    () => createFadeUpVariants(0.35, 20, 0.4),
    [],
  );

  const buttonVariants = useMemo(
    () => createFadeUpVariants(0.5, 20, 0.4),
    [],
  );

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

      <div className="relative z-10 grid w-full grid-cols-4 gap-4 md:grid-cols-8 xl:grid-cols-12">
        <div className="col-span-4 flex flex-col items-center gap-10 text-center md:col-span-8 xl:col-span-12">
          <div className="flex flex-col items-center gap-0 text-center">
            <HeroTitleStatic
              text="404"
              className="text-(--foreground)"
              ariaLabel="404 - Page not found"
              delay={0.2}
              duration={0.8}
            />
            <motion.p
              variants={paragraphVariants}
              initial="initial"
              animate="visible"
              className="text-xs text-(--neutral) md:text-sm tracking-wide -mt-3"
            >
              This page doesn&apos;t exist.
            </motion.p>
          </div>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="visible"
          >
            <Link
              href="/"
              className="cursor-pointer rounded-sm border border-(--foreground) bg-(--background) px-5 py-2.5 text-xs font-normal uppercase tracking-wider text-(--foreground) hover:bg-(--foreground) hover:text-(--background) hover:border-(--foreground) transition-all duration-300 focus-visible:outline focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm"
            >
              Go home
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
