import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { Metadata } from "next";
import localFont from "next/font/local";
import ReactDOM from "react-dom";

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

export const metadata: Metadata = {
  title: "Daniele Buser",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Preload critical font for LCP
  ReactDOM.preload("/fonts/NeueHaasGroteskDisplay-Bold.otf", {
    as: "font",
    type: "font/otf",
  });
  ReactDOM.preload("/fonts/NeueHaasGroteskDisplay-Reg.otf", {
    as: "font",
    type: "font/otf",
  });

  return (
    <html lang="en" className={neueHaasGrotesk.variable} data-scroll-behavior="smooth">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
