"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { CONTACT_LINKS, EMAIL } from "@/constants/contacts";
import { CURSOR_SIZE } from "@/constants/cursor";
import { CSS_VARIABLES } from "@/constants/theme";
import { ContactLink } from "@/types/contacts";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";

export default function Contacts() {
  const {
    handleMouseEnter: handleEmailEnter,
    handleMouseLeave: handleEmailLeave,
  } = useCursorInteraction("header", {
    onEnter: { size: CURSOR_SIZE.xs, color: CSS_VARIABLES.accent },
  });

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("header");

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(`mailto:${EMAIL}`, "_blank");
  };

  const renderContactLink = ({
    href,
    label,
    external,
    download,
  }: ContactLink) => (
    <a
      key={label}
      href={href}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...(download && {
        download: true,
      })}
      className="text-md text-[var(--neutral)] md:text-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

  const renderSeparator = (index: number) => (
    <span key={`separator-${index}`} className="text-[var(--neutral)]">
      |
    </span>
  );

  return (
    <section
      className="flex flex-col justify-between gap-10 md:gap-12 lg:flex-row lg:items-center"
      aria-labelledby="contacts-heading"
    >
      <motion.p
        className="max-w-sm text-xl leading-tight sm:max-w-md sm:text-2xl md:max-w-xl md:text-3xl md:leading-none lg:max-w-md lg:text-2xl xl:max-w-xl xl:text-3xl 2xl:max-w-2xl 2xl:text-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      >
        If you have a project in mind, feel free to reach out - I&apos;d be glad
        to help bring your vision to life.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
      >
        <a
          href={`mailto:${EMAIL}`}
          className="block"
          onClick={handleEmailClick}
          onMouseEnter={handleEmailEnter}
          onMouseLeave={handleEmailLeave}
          aria-label={`Send email to ${EMAIL}`}
        >
          <motion.h1
            id="contacts-heading"
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
            initial={{ color: "var(--foreground)" }}
            whileHover={{ color: "var(--neutral)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {EMAIL}
          </motion.h1>
        </a>

        <nav
          className="flex items-center justify-start gap-4"
          aria-label="Social and professional links"
        >
          {CONTACT_LINKS.map((link, index) => (
            <Fragment key={link.label}>
              {renderContactLink(link)}
              {index < CONTACT_LINKS.length - 1 && renderSeparator(index)}
            </Fragment>
          ))}
        </nav>
      </motion.div>
    </section>
  );
}
