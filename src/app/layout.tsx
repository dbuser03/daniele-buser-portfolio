import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata } from "next";
import localFont from "next/font/local";
import { baseMetadata, personJsonLd, websiteJsonLd } from "@/seo/metadata";

const neueHaasGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/NeueHaasGroteskDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasGroteskDisplay-Reg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasGroteskDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas",
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={neueHaasGrotesk.variable} data-scroll-behavior="smooth">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-(--accent) focus:text-(--foreground) focus:px-4 focus:py-2 focus:rounded-sm focus:outline-none"
        >
          Skip to content
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
