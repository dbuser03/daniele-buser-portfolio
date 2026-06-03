import type { Metadata } from "next";
import AboutIntro from "@/components/about/AboutIntro";
import AboutPortrait from "@/components/about/AboutPortrait";
import Hey from "@/components/about/Hey";
import HowIWork from "@/components/about/HowIWork";
import TechStack from "@/components/about/TechStack";
import AboutContacts from "@/components/about/AboutContacts";
import AboutLayout from "@/components/about/AboutLayout";

export const metadata: Metadata = {
  title: "About | Daniele Buser",
  description: "Learn more about Daniele Buser, a creative developer specializing in design engineering.",
  openGraph: {
    title: "About | Daniele Buser",
    description: "Learn more about Daniele Buser, a creative developer specializing in design engineering.",
    url: "https://danielebuser.com/about",
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
    title: "About | Daniele Buser",
    description: "Learn more about Daniele Buser, a creative developer specializing in design engineering.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex w-full flex-1 flex-col justify-start gap-0 bg-(--foreground) px-4 focus:outline-none"
      aria-label="About page main content"
    >
      <AboutLayout contacts={<AboutContacts />}>
        <section className="flex min-h-screen w-full flex-col justify-center py-20">
          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-4">
            <div className="relative z-10 flex flex-col gap-10 lg:col-span-9 lg:grid lg:h-full lg:grid-cols-9 lg:content-between lg:gap-4">
              <div className="lg:col-span-9">
                <Hey />
              </div>
              <div className="lg:col-span-6">
                <AboutIntro />
              </div>
            </div>
            <div className="relative z-10 hidden lg:col-span-3 lg:block">
              <AboutPortrait />
            </div>
          </div>
        </section>
        <section className="flex min-h-screen w-full flex-col justify-center gap-16 pt-0 pb-64 lg:gap-20">
          <TechStack />
          <HowIWork />
        </section>
      </AboutLayout>
    </main>
  );
}
