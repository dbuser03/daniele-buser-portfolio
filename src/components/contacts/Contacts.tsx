"use client";

import { Fragment, useMemo } from "react";
import { m } from "motion/react";
import { CONTACT_LINKS, EMAIL } from "@/constants/contacts";
import { ContactLink } from "@/types/contacts";
import { useCursorInteraction } from "@/hooks/useCursorInteraction";
import { useAnimations, motionTokens } from "@/utils/motion";
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
      className="text-body-lg"
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
  return <span className="text-neutral">|</span>;
}

const DEFAULT_VIEWPORT = { once: false, amount: 0.1 };

export default function Contacts({
  paragraphDelay = motionTokens.delay.long,
  linksDelay = motionTokens.delay.longer,
  trigger = "mount",
  viewport,
}: {
  paragraphDelay?: number;
  linksDelay?: number;
  trigger?: "mount" | "inView";
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
} = {}) {
  const { entranceVariants } = useAnimations();

  const {
    handleMouseEnter: handleEmailEnter,
    handleMouseLeave: handleEmailLeave,
  } = useCursorInteraction("interactive");

  const { handleMouseEnter, handleMouseLeave } =
    useCursorInteraction("interactive");

  const paragraphVariants = useMemo(
    () => entranceVariants(paragraphDelay),
    [paragraphDelay, entranceVariants],
  );

  const linksVariants = useMemo(
    () => entranceVariants(linksDelay),
    [linksDelay, entranceVariants],
  );

  return (
    <section
      className="grid w-full items-center gap-12 text-foreground grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12"
      aria-labelledby="contacts-heading"
    >
      <m.p
        className="text-section max-w-2xl col-span-4 sm:col-span-6 md:col-span-4 lg:col-span-5 xl:col-span-5"
        variants={paragraphVariants}
        initial="initial"
        animate={trigger === "mount" ? "visible" : undefined}
        whileInView={trigger === "inView" ? "visible" : undefined}
        viewport={viewport || DEFAULT_VIEWPORT}
      >
        If you have a project in mind, feel free to reach out - I&apos;d be glad
        to help bring your vision to life.
      </m.p>

      <m.div
        className="col-span-4 sm:col-span-6 md:col-span-4 md:col-start-5 lg:col-span-5 lg:col-start-6 xl:col-span-5 xl:col-start-8 justify-self-start md:justify-self-end"
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
          <h2 id="contacts-heading" className="text-display-sm text-foreground">
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
      </m.div>
    </section>
  );
}
