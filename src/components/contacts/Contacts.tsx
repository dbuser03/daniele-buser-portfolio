"use client";

import { Fragment, useMemo } from "react";
import { motion } from "motion/react";
import { CONTACT_LINKS, EMAIL } from "@/constants/contacts";
import { ContactLink } from "@/types/contacts";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { createFadeUpVariants } from "@/constants/animations";
import AnimatedTextSpan from "@/components/ui/AnimatedTextSpan";

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
      className="text-lg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatedTextSpan>
        {label}
        {external && <span className="sr-only"> (opens in new tab)</span>}
      </AnimatedTextSpan>
    </a>
  );
}

function Separator() {
  return <span className="text-(--neutral)">|</span>;
}

const DEFAULT_VIEWPORT = { once: false, amount: 0.1 };

export default function Contacts({
  paragraphDelay = 0.5,
  linksDelay = 0.65,
  trigger = "mount",
  viewport,
}: {
  paragraphDelay?: number;
  linksDelay?: number;
  trigger?: "mount" | "inView";
  viewport?: { once?: boolean; margin?: string; amount?: "some" | "all" | number };
} = {}) {
  const {
    handleMouseEnter: handleEmailEnter,
    handleMouseLeave: handleEmailLeave,
  } = useCursorInteraction("interactive");

  const { handleMouseEnter, handleMouseLeave } = useCursorInteraction("interactive");

  const paragraphVariants = useMemo(
    () => createFadeUpVariants(paragraphDelay),
    [paragraphDelay],
  );

  const linksVariants = useMemo(
    () => createFadeUpVariants(linksDelay),
    [linksDelay],
  );

  return (
    <section
      className="flex flex-row items-center justify-between gap-12 text-(--foreground)"
      aria-labelledby="contacts-heading"
    >
      <motion.p
        className="max-w-2xl text-section"
        variants={paragraphVariants}
        initial="initial"
        animate={trigger === "mount" ? "visible" : undefined}
        whileInView={trigger === "inView" ? "visible" : undefined}
        viewport={viewport || DEFAULT_VIEWPORT}
      >
        If you have a project in mind, feel free to reach out - I&apos;d be glad
        to help bring your vision to life.
      </motion.p>

      <motion.div
        variants={linksVariants}
        initial="initial"
        animate={trigger === "mount" ? "visible" : undefined}
        whileInView={trigger === "inView" ? "visible" : undefined}
        viewport={viewport || DEFAULT_VIEWPORT}
      >
        <a
          href={`mailto:${EMAIL}`}
          className="block w-fit"
          onMouseEnter={handleEmailEnter}
          onMouseLeave={handleEmailLeave}
          aria-label={`Send email to ${EMAIL}`}
          onClick={(e) => {
            e.preventDefault();
            window.open(`mailto:${EMAIL}`, "_blank");
          }}
        >
          <h2
            id="contacts-heading"
            className="text-7xl text-(--foreground)"
          >
            {EMAIL}
          </h2>
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
