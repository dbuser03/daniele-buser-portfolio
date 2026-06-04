import HeroTitle from "@/components/ui/HeroTitle";

export const ABOUT_HEY_ID = "about-hey-title";

export default function Hey() {
  return (
    <HeroTitle
      id={ABOUT_HEY_ID}
      text="Hey"
      className="relative z-10 -ml-4 inline-block text-(--background)"
      ariaLabel="Hey - About page heading"
      once={true}
      trigger="mount"
    />
  );
}
