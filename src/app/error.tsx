"use client";

import { useEffect } from "react";
import { m } from "motion/react";
import { HeroTitleMount } from "@/components/ui/HeroTitle";
import GridLines from "@/components/layout/GridLines";
import { motionTokens, useAnimations } from "@/utils/motion";
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

  const { entranceVariants } = useAnimations();

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative z-10 flex min-h-screen flex-col justify-center bg-background px-4 text-foreground focus:outline-none"
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
              className="text-foreground"
              ariaLabel="Hell Nah - Something went wrong"
              delay={motionTokens.delay.base}
              duration={motionTokens.duration.smooth}
            >
              Hell Nah
            </HeroTitleMount>
            <m.p
              variants={entranceVariants(motionTokens.delay.long, motionTokens.distance.base, motionTokens.duration.smooth)}
              initial="initial"
              animate="visible"
              className="-mt-3 text-body text-neutral"
            >
              Something went wrong
            </m.p>
          </div>
          <m.div
            variants={entranceVariants(motionTokens.delay.longer, motionTokens.distance.base, motionTokens.duration.smooth)}
            initial="initial"
            animate="visible"
          >
            <m.button
              type="button"
              onClick={reset}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="rounded-sm border border-foreground bg-background px-5 py-2.5 text-caption font-normal text-foreground uppercase hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Try again
            </m.button>
          </m.div>
        </div>
      </div>
    </main>
  );
}
