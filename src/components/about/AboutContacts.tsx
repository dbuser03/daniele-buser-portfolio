import { HeroTitleInView } from "@/components/ui/HeroTitle";
import Contacts from "@/components/contacts/Contacts";
import ContactSectionWrapper from "@/components/layout/ContactSectionWrapper";
import { motionTokens } from "@/utils/motion";

const viewportConfig = { once: false, amount: 0.6 };
export default function AboutContacts() {
  return (
    <section className="relative -mx-4 flex min-h-screen flex-col justify-center bg-background px-4 text-foreground">
      <ContactSectionWrapper>
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
      </ContactSectionWrapper>
    </section>
  );
}
