import type { Metadata } from "next";
import Contacts from "@/components/contacts/Contacts";
import Hello from "@/components/contacts/Hello";

export const metadata: Metadata = {
  title: "Contact | Daniele Buser",
  description: "Get in touch with Daniele Buser for project inquiries or collaboration possibilities.",
  openGraph: {
    title: "Contact | Daniele Buser",
    description: "Get in touch with Daniele Buser for project inquiries or collaboration possibilities.",
    url: "https://danielebuser.com/contacts",
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
    title: "Contact | Daniele Buser",
    description: "Get in touch with Daniele Buser for project inquiries or collaboration possibilities.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="z-1 flex w-full flex-1 flex-col justify-start gap-0 px-4 focus:outline-none"
      aria-label="Contacts page main content"
    >
      <section className="flex min-h-screen flex-col justify-center gap-48 py-20 md:gap-64">
        <Hello />
        <Contacts />
      </section>
    </main>
  );
}
