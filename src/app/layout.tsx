import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import { baseMetadata, personJsonLd, websiteJsonLd } from "@/utils/metadata";

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
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neueHaasGrotesk.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ClientLayout>
          <Header />
          {children}
          <Footer />
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
