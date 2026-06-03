import { Metadata } from "next";

export const baseMetadata: Metadata = {
  metadataBase: new URL("https://danielebuser.com"),
  title: {
    default: "Daniele Buser | Creative Developer & Design Engineer",
    template: "%s | Daniele Buser — Creative Developer",
  },
  description:
    "Personal creative development portfolio of Daniele Buser. Specializing in high-performance front-end engineering, interactive animations, and design systems.",
  keywords: [
    "Daniele Buser",
    "Creative Developer",
    "Design Engineer",
    "Front-end Developer",
    "Creative Development Portfolio",
    "Next.js Developer",
    "WebGL",
    "Framer Motion",
    "Interactive Web Design",
    "TypeScript",
  ],
  authors: [{ name: "Daniele Buser", url: "https://danielebuser.com" }],
  creator: "Daniele Buser",
  openGraph: {
    title: "Daniele Buser | Creative Developer & Design Engineer",
    description:
      "Personal creative development portfolio of Daniele Buser. Specializing in high-performance front-end engineering, interactive animations, and design systems.",
    url: "https://danielebuser.com",
    siteName: "Daniele Buser Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniele Buser — Creative Developer & Design Engineer Portfolio Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniele Buser | Creative Developer & Design Engineer",
    description:
      "Personal creative development portfolio of Daniele Buser. Specializing in high-performance front-end engineering, interactive animations, and design systems.",
    images: ["/og-image.png"],
  },
};

export const homeMetadata: Metadata = {
  title: "Projects",
  description: "Explore the creative development and interactive design projects of Daniele Buser, showcasing high-performance web, 3D graphics, and clean front-end engineering.",
  openGraph: {
    title: "Projects | Daniele Buser — Creative Developer",
    description: "Explore the creative development and interactive design projects of Daniele Buser, showcasing high-performance web, 3D graphics, and clean front-end engineering.",
    url: "https://danielebuser.com",
  },
  twitter: {
    title: "Projects | Daniele Buser — Creative Developer",
    description: "Explore the creative development and interactive design projects of Daniele Buser, showcasing high-performance web, 3D graphics, and clean front-end engineering.",
  },
};

export const aboutMetadata: Metadata = {
  title: "About",
  description: "Learn more about Daniele Buser, a creative developer combining design engineering, performance optimization, and interactive front-end experiences.",
  openGraph: {
    title: "About | Daniele Buser — Creative Developer",
    description: "Learn more about Daniele Buser, a creative developer combining design engineering, performance optimization, and interactive front-end experiences.",
    url: "https://danielebuser.com/about",
  },
  twitter: {
    title: "About | Daniele Buser — Creative Developer",
    description: "Learn more about Daniele Buser, a creative developer combining design engineering, performance optimization, and interactive front-end experiences.",
  },
};

export const contactMetadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Daniele Buser for freelance creative development, interactive design engineering contracts, or general inquiries.",
  openGraph: {
    title: "Contact | Daniele Buser — Creative Developer",
    description: "Get in touch with Daniele Buser for freelance creative development, interactive design engineering contracts, or general inquiries.",
    url: "https://danielebuser.com/contacts",
  },
  twitter: {
    title: "Contact | Daniele Buser — Creative Developer",
    description: "Get in touch with Daniele Buser for freelance creative development, interactive design engineering contracts, or general inquiries.",
  },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Daniele Buser",
  "jobTitle": "Creative Developer & Design Engineer",
  "url": "https://danielebuser.com",
  "sameAs": [
    "https://linkedin.com/in/daniele-buser",
    "https://github.com/dbuser03"
  ],
  "knowsAbout": [
    "Creative Development",
    "Design Engineering",
    "Front-end Engineering",
    "Next.js",
    "React",
    "Tailwind CSS",
    "WebGL",
    "Framer Motion",
    "TypeScript"
  ]
};
