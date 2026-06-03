"use client";

import { Fragment, useState, useEffect } from "react";
import { motion } from "motion/react";
import { CONTACT_LINKS, EMAIL } from "@/constants/contacts";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import { ContactLink } from "@/types/contacts";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

function ContactLinkItem({
  link,
  onMouseEnter,
  onMouseLeave,
}: {
  link: ContactLink;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const { href, label, external, download } = link;
  return (
    <a
      href={href}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...(download && {
        download: true,
      })}
      className="text-md text-(--neutral) md:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.span
        initial={{ color: "var(--neutral)" }}
        whileHover={{ color: "var(--foreground)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {label}
      </motion.span>
    </a>
  );
}

function Separator() {
  return <span className="text-(--neutral)">|</span>;
}

export default function Contacts({
  paragraphDelay = 0.5,
  linksDelay = 0.65,
}: {
  paragraphDelay?: number;
  linksDelay?: number;
} = {}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const {
    handleMouseEnter: handleEmailEnter,
    handleMouseLeave: handleEmailLeave,
  } = useCursorInteraction("header", {
    onEnter: { size: CURSOR_SIZE.xs, color: CSS_VARIABLES.accent },
  });

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("header");

  const paragraphVariants = {
    initial: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: paragraphDelay,
      },
    },
  } as const;

  const linksVariants = {
    initial: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: linksDelay,
      },
    },
  } as const;

  return (
    <section
      className="flex flex-col justify-between gap-10 md:gap-12 lg:flex-row lg:items-center"
      aria-labelledby="contacts-heading"
    >
      <motion.p
        className="max-w-sm text-xl leading-tight sm:max-w-md sm:text-2xl md:max-w-xl md:text-3xl md:leading-none lg:max-w-md lg:text-2xl xl:max-w-xl xl:text-3xl 2xl:max-w-2xl 2xl:text-4xl"
        variants={paragraphVariants}
        initial="initial"
        whileInView={isReady ? "visible" : undefined}
        viewport={{ once: false, amount: 0.1 }}
      >
        If you have a project in mind, feel free to reach out - I&apos;d be glad
        to help bring your vision to life.
      </motion.p>

      <motion.div
        variants={linksVariants}
        initial="initial"
        whileInView={isReady ? "visible" : undefined}
        viewport={{ once: false, amount: 0.1 }}
      >
        <a
          href={`mailto:${EMAIL}`}
          className="block w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-4 focus-visible:rounded-sm"
          onMouseEnter={handleEmailEnter}
          onMouseLeave={handleEmailLeave}
          aria-label={`Send email to ${EMAIL}`}
        >
          <motion.h2
            id="contacts-heading"
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
            initial={{ color: "var(--foreground)" }}
            whileHover={{ color: "var(--neutral)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {EMAIL}
          </motion.h2>
        </a>

        <nav
          className="flex items-center justify-start gap-4"
          aria-label="Social and professional links"
        >
          {CONTACT_LINKS.map((link, index) => (
            <Fragment key={link.label}>
              <ContactLinkItem
                link={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              {index < CONTACT_LINKS.length - 1 && <Separator />}
            </Fragment>
          ))}
        </nav>
      </motion.div>
    </section>
  );
}
