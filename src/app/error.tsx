"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { HeroTitleMount } from "@/components/ui/HeroTitle";
import GridLines from "@/components/layout/GridLines";
import { entranceVariants, motionTokens } from "@/constants/animations";
import { CSS_VARIABLES } from "@/constants/theme";
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
        <GridLines />
      </div>

      <div className="relative z-10 grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-0 text-center">
            <HeroTitleMount
              className="text-(--foreground)"
              ariaLabel="Hell Nah - Something went wrong"
              delay={0.35}
              duration={motionTokens.duration.smooth}
            >
              Hell Nah
            </HeroTitleMount>
            <motion.p
              variants={entranceVariants(0.5, 20, motionTokens.duration.smooth)}
              initial="initial"
              animate="visible"
              className="-mt-3 text-sm tracking-wide text-(--neutral)"
            >
              Something went wrong
            </motion.p>
          </div>
          <motion.div
            variants={entranceVariants(0.65, 20, motionTokens.duration.smooth)}
            initial="initial"
            animate="visible"
          >
            <motion.button
              type="button"
              onClick={reset}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              whileHover={{
                backgroundColor: CSS_VARIABLES.foreground,
                color: CSS_VARIABLES.background,
              }}
              transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.standard }}
              className="rounded-sm border border-(--foreground) bg-(--background) px-5 py-2.5 text-xs font-normal tracking-wider text-(--foreground) uppercase"
            >
              Try again
            </motion.button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
