"use client";

import {
  CONTACT_LINKS,
  EMAIL,
  contactsVariants,
  contactsAnimationConfig,
  contactsDelays,
} from "@/constants/contacts";
import { ContactLink } from "@/types/contacts";
import { motion } from "motion/react";
import React from "react";

const Contacts: React.FC = () => {
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
      className="text-md text-[var(--neutral)] transition-opacity duration-200 hover:opacity-70 md:text-lg"
    >
      {label}
    </a>
  );

  const renderSeparator = (index: number) => (
    <span key={`separator-${index}`} className="text-[var(--neutral)]">
      |
    </span>
  );

  return (
    <motion.section
      className="flex flex-col justify-between gap-10 md:gap-12 lg:flex-row lg:items-center"
      initial="hidden"
      animate="visible"
      variants={contactsVariants}
      transition={{ ...contactsAnimationConfig, delay: contactsDelays.section }}
    >
      <p className="max-w-sm text-xl leading-tight sm:max-w-md sm:text-2xl md:max-w-xl md:text-3xl md:leading-none lg:max-w-md lg:text-2xl xl:max-w-xl xl:text-3xl 2xl:max-w-2xl 2xl:text-4xl">
        If you have a project in mind, feel free to reach out - I&apos;d be glad
        to help bring your vision to life.
      </p>

      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
          {EMAIL}
        </h1>

        <nav className="flex items-center justify-start gap-4">
          {CONTACT_LINKS.map((link, index) => (
            <React.Fragment key={link.label}>
              {renderContactLink(link)}
              {index < CONTACT_LINKS.length - 1 && renderSeparator(index)}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </motion.section>
  );
};

export default Contacts;
