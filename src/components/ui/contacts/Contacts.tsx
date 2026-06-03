"use client";

import {
  CONTACT_LINKS,
  EMAIL,
  contactsVariants,
  contactsAnimationConfig,
  contactsDelays,
  emailInteractionConfig,
} from "@/constants/contacts";
import { ContactLink } from "@/types/contacts";
import { motion } from "motion/react";
import React from "react";
import { useCursorInteraction } from "@/hooks/layout/cursor/useCursorInteraction";
import { useEmailCopy } from "@/hooks/useEmailCopy";

const Contacts: React.FC = () => {
  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction(
    "header",
    undefined,
    {
      onEnter: { color: "var(--accent)" },
      onLeave: { color: "var(--accent)" },
    },
  );

  const { handleEmailEnter, handleEmailLeave, handleEmailClick } =
    useEmailCopy(EMAIL);

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
        whileHover={{ color: "var(--neutral-dark)" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
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
    <section className="flex flex-col justify-between gap-10 md:gap-12 lg:flex-row lg:items-center">
      <motion.p
        className="max-w-sm text-xl leading-tight sm:max-w-md sm:text-2xl md:max-w-xl md:text-3xl md:leading-none lg:max-w-md lg:text-2xl xl:max-w-xl xl:text-3xl 2xl:max-w-2xl 2xl:text-4xl"
        initial="hidden"
        animate="visible"
        variants={contactsVariants}
        transition={{
          ...contactsAnimationConfig,
          delay: contactsDelays.section,
        }}
      >
        If you have a project in mind, feel free to reach out - I&apos;d be glad
        to help bring your vision to life.
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={contactsVariants}
        transition={{
          ...contactsAnimationConfig,
          delay: contactsDelays.section + 0.2,
        }}
      >
        <motion.h1
          className="cursor-pointer text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
          onMouseEnter={handleEmailEnter}
          onMouseLeave={handleEmailLeave}
          onClick={handleEmailClick}
          whileHover={{ color: "var(--neutral)" }}
          whileTap={{ scale: emailInteractionConfig.scale.tap }}
          transition={emailInteractionConfig.transition}
          style={{ originX: 0 }}
        >
          {EMAIL}
        </motion.h1>

        <nav className="flex items-center justify-start gap-4">
          {CONTACT_LINKS.map((link, index) => (
            <React.Fragment key={link.label}>
              {renderContactLink(link)}
              {index < CONTACT_LINKS.length - 1 && renderSeparator(index)}
            </React.Fragment>
          ))}
        </nav>
      </motion.div>
    </section>
  );
};

export default Contacts;
