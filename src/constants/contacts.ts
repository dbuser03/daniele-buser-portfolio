import { ContactLink } from "@/types/contacts";
import { LINKEDIN_URL, GITHUB_URL } from "@/constants/site";

export const EMAIL = "buserdaniele@gmail.com";

export const CONTACT_LINKS: ContactLink[] = [
  {
    href: LINKEDIN_URL,
    label: "LinkedIn",
    external: true,
  },
  {
    href: GITHUB_URL,
    label: "GitHub",
    external: true,
  },
  {
    href: "/daniele-buser-resume.pdf",
    label: "Resume",
    download: true,
  },
];
