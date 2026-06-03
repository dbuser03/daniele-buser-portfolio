import { ContactLink } from "@/types/contacts";

export const EMAIL = "buserdaniele@gmail.com";

export const CONTACT_LINKS: ContactLink[] = [
  {
    href: "https://linkedin.com/in/daniele-buser",
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/dbuser03",
    label: "GitHub",
    external: true,
  },
  {
    href: "/daniele-buser-resume.pdf",
    label: "Resume",
    download: true,
  },
];

export const contactsVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

export const helloVariants = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0 },
};

export const contactsAnimationConfig = {
  duration: 0.6,
  ease: "easeInOut" as const,
};

export const contactsDelays = {
  section: 0.6,
  hello: 0.4,
};

export const EMAIL_COPY_DURATIONS = {
  checkIconDisplay: 800,
  labelDisplay: 1200,
};

export const emailInteractionConfig = {
  scale: {
    hover: 0.98,
    tap: 0.94,
  },
  transition: {
    duration: 0.2,
    ease: "easeInOut" as const,
  },
};
