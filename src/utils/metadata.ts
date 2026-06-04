import { Metadata } from "next";
import { SITE_URL } from "@/constants/site";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Daniele Buser Portfolio",

  title: {
    default: "Daniele Buser | Creative Developer & Design Engineer",
    template: "%s | Daniele Buser — Creative Developer",
  },

  description:
    "Portfolio of Daniele Buser, Creative Developer & Design Engineer specialising in high-performance front-end engineering, interactive animations, and design systems built with Next.js, TypeScript and WebGL.",

  keywords: [
    "Daniele Buser",
    "Creative Developer",
    "Design Engineer",
    "Front-end Developer",
    "Creative Development Portfolio",
    "Next.js Developer",
    "WebGL",
    "Three.js",
    "Framer Motion",
    "GSAP",
    "Interactive Web Design",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Web Performance",
    "UI Animation",
  ],

  authors: [{ name: "Daniele Buser", url: "https://danielebuser.com" }],
  creator: "Daniele Buser",
  publisher: "Daniele Buser",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "https://danielebuser.com",
  },

  openGraph: {
    title: "Daniele Buser | Creative Developer & Design Engineer",
    description:
      "Portfolio of Daniele Buser, Creative Developer & Design Engineer specialising in high-performance front-end engineering, interactive animations, and design systems built with Next.js, TypeScript and WebGL.",
    url: "https://danielebuser.com",
    siteName: "Daniele Buser Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniele Buser — Creative Developer & Design Engineer Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Daniele Buser | Creative Developer & Design Engineer",
    description:
      "Portfolio of Daniele Buser, Creative Developer & Design Engineer specialising in high-performance front-end engineering, interactive animations, and design systems.",
    images: [
      {
        url: "/og-image.png",
        alt: "Daniele Buser — Creative Developer & Design Engineer Portfolio",
      },
    ],
  },
};

export const homeMetadata: Metadata = {
  title: "Projects",
  description:
    "Browse Daniele Buser's creative development projects: interactive 3D experiences, WebGL experiments, and high-performance front-end engineering showcasing the intersection of design and code.",
  alternates: {
    canonical: "https://danielebuser.com",
  },
  openGraph: {
    title: "Projects | Daniele Buser — Creative Developer",
    description:
      "Browse Daniele Buser's creative development projects: interactive 3D experiences, WebGL experiments, and high-performance front-end engineering showcasing the intersection of design and code.",
    url: "https://danielebuser.com",
    type: "website",
  },
  twitter: {
    title: "Projects | Daniele Buser — Creative Developer",
    description:
      "Browse Daniele Buser's creative development projects: interactive 3D experiences, WebGL experiments, and high-performance front-end engineering showcasing the intersection of design and code.",
  },
};

export const aboutMetadata: Metadata = {
  title: "About",
  description:
    "Daniele Buser is a Creative Developer & Design Engineer passionate about bridging the gap between design and engineering — building interactive, performant, and visually rich web experiences.",
  alternates: {
    canonical: "https://danielebuser.com/about",
  },
  openGraph: {
    title: "About | Daniele Buser — Creative Developer",
    description:
      "Daniele Buser is a Creative Developer & Design Engineer passionate about bridging the gap between design and engineering — building interactive, performant, and visually rich web experiences.",
    url: "https://danielebuser.com/about",
    type: "profile",
    firstName: "Daniele",
    lastName: "Buser",
  },
  twitter: {
    title: "About | Daniele Buser — Creative Developer",
    description:
      "Daniele Buser is a Creative Developer & Design Engineer passionate about bridging the gap between design and engineering — building interactive, performant, and visually rich web experiences.",
  },
};

export const contactMetadata: Metadata = {
  title: "Contact",
  description:
    "Available for freelance projects and full-time opportunities. Reach out to Daniele Buser for creative development, interactive design engineering, or front-end consultancy.",
  alternates: {
    canonical: "https://danielebuser.com/contacts",
  },
  openGraph: {
    title: "Contact | Daniele Buser — Creative Developer",
    description:
      "Available for freelance projects and full-time opportunities. Reach out to Daniele Buser for creative development, interactive design engineering, or front-end consultancy.",
    url: "https://danielebuser.com/contacts",
    type: "website",
  },
  twitter: {
    title: "Contact | Daniele Buser — Creative Developer",
    description:
      "Available for freelance projects and full-time opportunities. Reach out to Daniele Buser for creative development, interactive design engineering, or front-end consultancy.",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://danielebuser.com/#website",
  name: "Daniele Buser Portfolio",
  url: "https://danielebuser.com",
  description:
    "Portfolio of Daniele Buser, Creative Developer & Design Engineer specialising in high-performance front-end engineering, interactive animations, and design systems.",
  author: {
    "@type": "Person",
    "@id": "https://danielebuser.com/#person",
  },
  inLanguage: "en-US",
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://danielebuser.com/#person",
  name: "Daniele Buser",
  jobTitle: "Creative Developer & Design Engineer",
  url: "https://danielebuser.com",
  sameAs: [
    "https://linkedin.com/in/daniele-buser",
    "https://github.com/dbuser03",
  ],
  knowsAbout: [
    "Creative Development",
    "Design Engineering",
    "Front-end Engineering",
    "Next.js",
    "React",
    "Tailwind CSS",
    "WebGL",
    "Three.js",
    "Framer Motion",
    "GSAP",
    "TypeScript",
    "Web Performance",
    "UI Animation",
  ],
};

export const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://danielebuser.com/#webpage",
  url: "https://danielebuser.com",
  name: "Projects | Daniele Buser — Creative Developer",
  description:
    "Browse Daniele Buser's creative development projects: interactive 3D experiences, WebGL experiments, and high-performance front-end engineering.",
  isPartOf: { "@id": "https://danielebuser.com/#website" },
  author: { "@id": "https://danielebuser.com/#person" },
  inLanguage: "en-US",
};

export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://danielebuser.com/about#webpage",
  url: "https://danielebuser.com/about",
  name: "About | Daniele Buser — Creative Developer",
  description:
    "Daniele Buser is a Creative Developer & Design Engineer passionate about bridging the gap between design and engineering.",
  isPartOf: { "@id": "https://danielebuser.com/#website" },
  about: { "@id": "https://danielebuser.com/#person" },
  inLanguage: "en-US",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://danielebuser.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://danielebuser.com/about",
      },
    ],
  },
};

export const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://danielebuser.com/contacts#webpage",
  url: "https://danielebuser.com/contacts",
  name: "Contact | Daniele Buser — Creative Developer",
  description:
    "Available for freelance projects and full-time opportunities. Reach out to Daniele Buser for creative development and interactive design engineering.",
  isPartOf: { "@id": "https://danielebuser.com/#website" },
  author: { "@id": "https://danielebuser.com/#person" },
  inLanguage: "en-US",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://danielebuser.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://danielebuser.com/contacts",
      },
    ],
  },
};
