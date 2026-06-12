import { HeroTitleInView } from "@/components/ui/HeroTitle";
import Contacts from "@/components/contacts/Contacts";
import GridLines from "@/components/layout/GridLines";
import { motionTokens } from "@/utils/motion";

const viewportConfig = { once: false, amount: 0.6 };
export default function AboutContacts() {
  return (
    <section className="relative -mx-4 flex min-h-screen flex-col justify-center bg-background px-4 text-foreground">
      <div className="mx-auto flex w-full max-w-480 flex-1 flex-col justify-center relative py-20">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <GridLines variant="dark" />
        </div>

        <div className="relative z-10 flex flex-col gap-64">
          <HeroTitleInView
            as="h2"
            className="text-foreground"
            ariaLabel="Say Hello - Contact section heading"
            yOffset={motionTokens.distance.hero}
            delay={motionTokens.delay.none}
            viewport={viewportConfig}
          >
            Say Hello
          </HeroTitleInView>
          <Contacts
            paragraphDelay={motionTokens.delay.short}
            linksDelay={motionTokens.delay.base}
            trigger="inView"
            viewport={viewportConfig}
          />
        </div>
      </div>
    </section>
  );
}
