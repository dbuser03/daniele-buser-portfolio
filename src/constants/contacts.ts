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
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const helloVariants = {
  hidden: { opacity: 0, y: 48 },
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
