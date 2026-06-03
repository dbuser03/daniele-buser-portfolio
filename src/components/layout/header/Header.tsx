import Logo from "./Logo";
import Navbar from "./Navbar";
import { HeaderProps } from "@/types/layout";

export default function Header({
  variant = "dark",
  preventAnimation = false,
}: HeaderProps) {
  return (
    <header
      className="fixed top-0 z-30 flex w-full flex-row justify-between p-4"
      role="banner"
    >
      <Logo variant={variant} preventAnimation={preventAnimation} />
      <Navbar variant={variant} preventAnimation={preventAnimation} />
    </header>
  );
}
