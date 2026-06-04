"use client";

import HeroTitle from "@/components/ui/HeroTitle";

export default function ProjectsTitle() {
  return (
    <HeroTitle
      className="relative z-10 flex w-full justify-between items-baseline text-(--background) text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem]"
      ariaLabel="Projects '26"
      once={true}
      showDot={false}
    >
      <span className="-ml-1 sm:-ml-2 md:-ml-3 lg:-ml-3.5">
        Projects
      </span>
      <span className="text-right -mr-1 md:-mr-2">
        <span className="text-(--accent)">&apos;</span>26
      </span>
    </HeroTitle>
  );
}
