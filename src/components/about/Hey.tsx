import { HeroTitleMount } from "@/components/ui/HeroTitle";

export const ABOUT_HEY_ID = "about-hey-title";

export default function Hey() {
  return (
    <HeroTitleMount
      id={ABOUT_HEY_ID}
      className="relative z-10 -ml-4 inline-block text-(--background)"
      ariaLabel="Hey - About page heading"
    >
      Hey
    </HeroTitleMount>
  );
}
