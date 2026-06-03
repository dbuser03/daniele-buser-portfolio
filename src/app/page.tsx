import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Daniele Buser",
  description: "Daniele Buser's personal portfolio website showcasing creative web and mobile design.",
  openGraph: {
    title: "Projects | Daniele Buser",
    description: "Daniele Buser's personal portfolio website showcasing creative web and mobile design.",
    url: "https://danielebuser.com",
    siteName: "Daniele Buser Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniele Buser Portfolio Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Daniele Buser",
    description: "Daniele Buser's personal portfolio website showcasing creative web and mobile design.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex w-full flex-1 flex-col bg-(--foreground) px-4 focus:outline-none"
      aria-label="Projects page main content"
    >
      <h1 className="sr-only">Projects</h1>
    </main>
  );
}
