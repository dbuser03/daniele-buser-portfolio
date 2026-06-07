"use client";

import { useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { HeroTitleStatic } from "@/components/ui/HeroTitle";
import GridLines from "@/components/layout/GridLines";
import { createFadeUpVariants } from "@/constants/animations";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const paragraphVariants = useMemo(
    () => createFadeUpVariants(0.35, 20, 0.4),
    [],
  );

  const buttonVariants = useMemo(() => createFadeUpVariants(0.5, 20, 0.4), []);

  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("current");

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative z-10 flex min-h-screen flex-col justify-center bg-(--background) px-4 text-(--foreground) focus:outline-none"
      aria-label="Error page main content"
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
              text="Hell Nah"
              className="text-(--foreground)"
              ariaLabel="Hell Nah - Something went wrong"
              delay={0.2}
              duration={0.8}
            />
            <motion.p
              variants={paragraphVariants}
              initial="initial"
              animate="visible"
              className="-mt-3 text-xs tracking-wide text-(--neutral) md:text-sm"
            >
              Something went wrong
            </motion.p>
          </div>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            animate="visible"
          >
            <button
              type="button"
              onClick={reset}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer rounded-sm border border-(--foreground) bg-(--background) px-5 py-2.5 text-xs font-normal tracking-wider text-(--foreground) uppercase transition-all duration-300 hover:border-(--foreground) hover:bg-(--foreground) hover:text-(--background) focus-visible:rounded-sm focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-(--accent)"
            >
              Try again
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
