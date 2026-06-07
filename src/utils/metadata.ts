import { Metadata } from "next";
import { SITE_URL, LINKEDIN_URL, GITHUB_URL } from "@/constants/site";

const sharedOgImages = [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Daniele Buser — Creative Developer & Design Engineer Portfolio",
    type: "image/png",
  },
];

const sharedTwitterImages = [
  {
    url: "/og-image.png",
    alt: "Daniele Buser — Creative Developer & Design Engineer Portfolio",
  },
];

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Daniele Buser Portfolio",

  title: {
    default: "Daniele Buser | Creative Developer & Design Engineer",
    template: "%s | Daniele Buser — Creative Developer",
  },

  description:
    "Portfolio of Daniele Buser: Creative Developer & Design Engineer specialising in front-end engineering, interactive animations, and WebGL.",

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

  authors: [{ name: "Daniele Buser", url: SITE_URL }],
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
    canonical: "/",
  },

  openGraph: {
    title: "Daniele Buser | Creative Developer & Design Engineer",
    description:
      "Portfolio of Daniele Buser: Creative Developer & Design Engineer specialising in front-end engineering, interactive animations, and WebGL.",
    url: "/",
    siteName: "Daniele Buser Portfolio",
    images: sharedOgImages,
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Daniele Buser | Creative Developer & Design Engineer",
    description:
      "Portfolio of Daniele Buser: Creative Developer & Design Engineer specialising in front-end engineering, interactive animations, and WebGL.",
    images: sharedTwitterImages,
  },
};

export const projectsMetadata: Metadata = {
  title: "Projects | Daniele Buser — Creative Developer",
  description:
    "Explore Daniele Buser's creative development projects: interactive 3D web experiences, WebGL experiments, and high-performance front-end engineering.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Projects | Daniele Buser — Creative Developer",
    description:
      "Explore Daniele Buser's creative development projects: interactive 3D web experiences, WebGL experiments, and high-performance front-end engineering.",
    url: "/",
    type: "website",
    images: sharedOgImages,
  },
  twitter: {
    title: "Projects | Daniele Buser — Creative Developer",
    description:
      "Explore Daniele Buser's creative development projects: interactive 3D web experiences, WebGL experiments, and high-performance front-end engineering.",
    images: sharedTwitterImages,
  },
};

export const aboutMetadata: Metadata = {
  title: "About",
  description:
    "Daniele Buser is a Creative Developer & Design Engineer bridging the gap between design and code with interactive, high-performance web experiences.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Daniele Buser — Creative Developer",
    description:
      "Daniele Buser is a Creative Developer & Design Engineer bridging the gap between design and code with interactive, high-performance web experiences.",
    url: "/about",
    type: "profile",
    firstName: "Daniele",
    lastName: "Buser",
    images: sharedOgImages,
  },
  twitter: {
    title: "About | Daniele Buser — Creative Developer",
    description:
      "Daniele Buser is a Creative Developer & Design Engineer bridging the gap between design and code with interactive, high-performance web experiences.",
    images: sharedTwitterImages,
  },
};

export const contactMetadata: Metadata = {
  title: "Contact",
  description:
    "Available for freelance and full-time roles. Contact Daniele Buser for creative development, interactive design engineering, or front-end consultancy.",
  alternates: {
    canonical: "/contacts",
  },
  openGraph: {
    title: "Contact | Daniele Buser — Creative Developer",
    description:
      "Available for freelance and full-time roles. Contact Daniele Buser for creative development, interactive design engineering, or front-end consultancy.",
    url: "/contacts",
    type: "website",
    images: sharedOgImages,
  },
  twitter: {
    title: "Contact | Daniele Buser — Creative Developer",
    description:
      "Available for freelance and full-time roles. Contact Daniele Buser for creative development, interactive design engineering, or front-end consultancy.",
    images: sharedTwitterImages,
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Daniele Buser Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Daniele Buser: Creative Developer & Design Engineer specialising in front-end engineering, interactive animations, and WebGL.",
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
  },
  inLanguage: "en-US",
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Daniele Buser",
  jobTitle: "Creative Developer & Design Engineer",
  url: SITE_URL,
  sameAs: [LINKEDIN_URL, GITHUB_URL],
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

export const projectsPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "Projects | Daniele Buser — Creative Developer",
  description:
    "Explore Daniele Buser's creative development projects: interactive 3D web experiences, WebGL experiments, and high-performance front-end engineering.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  },
};

export const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: "About | Daniele Buser — Creative Developer",
  description:
    "Daniele Buser is a Creative Developer & Design Engineer bridging the gap between design and code with interactive, high-performance web experiences.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/about#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${SITE_URL}/about`,
      },
    ],
  },
};

export const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contacts#webpage`,
  url: `${SITE_URL}/contacts`,
  name: "Contact | Daniele Buser — Creative Developer",
  description:
    "Available for freelance and full-time roles. Contact Daniele Buser for creative development, interactive design engineering, or front-end consultancy.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/contacts#breadcrumb`,
    name: "Breadcrumbs",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${SITE_URL}/contacts`,
      },
    ],
  },
};
