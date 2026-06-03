import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniele Buser",
  description: "Daniele Buser's personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
