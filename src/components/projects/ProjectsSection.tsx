"use client";

import { m } from "motion/react";
import { PROJECTS } from "@/constants/projects";
import ProjectCard from "./ProjectCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { motionTokens, useAnimations } from "@/utils/motion";
import { useEffect, useState } from "react";

export default function ProjectsSection() {
  const { entranceVariants, listVariants } = useAnimations();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const isHashAdmin = window.location.hash === "#admin";
      const isHashLogout = window.location.hash === "#logout";
      const isLocalAdmin = localStorage.getItem("admin") === "true";
      
      if (isHashLogout) {
        localStorage.removeItem("admin");
        window.history.replaceState(null, "", window.location.pathname);
        setIsAdmin(false);
      } else if (isHashAdmin) {
        localStorage.setItem("admin", "true");
        window.history.replaceState(null, "", window.location.pathname);
        setIsAdmin(true);
      } else if (isLocalAdmin) {
        setIsAdmin(true);
      }
      
      setIsReady(true);
    };

    checkAdmin();
  }, []);

  const labelDelay = motionTokens.delay.long;
  const cardsDelay = motionTokens.delay.base + motionTokens.duration.base;

  const labelVariants = entranceVariants(labelDelay, motionTokens.distance.base, motionTokens.duration.smooth);

  return (
    <section
      className="relative z-10 flex w-full flex-col pb-64"
      aria-labelledby="projects-list-heading"
    >
      <SectionLabel
        as={m.h2}
        id="projects-list-heading"
        variant="section-heading"
        variants={labelVariants}
        initial="initial"
        animate={isReady ? "visible" : "initial"}
      >
        SELECTED WORKS
      </SectionLabel>
      <m.div
        className="mt-3 grid w-full grid-cols-12 gap-4"
        variants={listVariants(cardsDelay, motionTokens.stagger.loose)}
        initial="initial"
        animate={isReady ? "visible" : "initial"}
      >
        {PROJECTS.map((project, index) => {
          const isVisible = !project.isHidden || isAdmin;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              priority={index === 0}
              className={!isVisible ? "hidden!" : ""}
            />
          );
        })}
      </m.div>
    </section>
  );
}
