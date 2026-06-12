import type { Metadata } from "next";
import AboutIntro from "@/components/about/AboutIntro";
import AboutPortrait from "@/components/about/AboutPortrait";
import Hey from "@/components/about/Hey";
import HowIWork from "@/components/about/how-i-work/HowIWork";
import TechStack from "@/components/about/tech-stack/TechStack";
import AboutContacts from "@/components/about/AboutContacts";
import AboutLayout from "@/components/about/AboutLayout";
import { aboutMetadata, aboutPageJsonLd } from "@/utils/metadata";
import { BIRTH_DATE } from "@/constants/about";
import { getAgeFromBirthDate } from "@/utils/date";

export const metadata: Metadata = aboutMetadata;
export const dynamic = "force-dynamic";

export default function AboutPage() {
  const age = getAgeFromBirthDate(BIRTH_DATE);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full flex-1 flex-col justify-start gap-0 bg-foreground px-4 focus:outline-none"
        aria-label="About page main content"
      >
        <AboutLayout contacts={<AboutContacts />}>
          <section className="flex min-h-screen w-full flex-col justify-center py-20">
            <div className="grid w-full grid-cols-12 gap-4">
              <div className="relative z-10 col-span-9 grid h-full grid-cols-9 content-between gap-4">
                <div className="col-span-9">
                  <Hey />
                </div>
                <div className="col-span-6 self-end">
                  <AboutIntro age={age} />
                </div>
              </div>
              <div className="relative z-10 col-span-3 block">
                <AboutPortrait />
              </div>
            </div>
          </section>
          <section className="flex min-h-screen w-full flex-col justify-center gap-20 pt-0 pb-64">
            <TechStack />
            <HowIWork />
          </section>
        </AboutLayout>
      </main>
    </>
  );
}
