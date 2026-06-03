import Logo from "./Logo";
import Navbar from "./Navbar";
import { HeaderProps } from "@/types/layout";

export default function Header({
  preventAnimation = false,
}: HeaderProps) {
  return (
    <header
      className="fixed top-0 z-30 flex w-full flex-row justify-between p-4"
    >
      <Logo preventAnimation={preventAnimation} />
      <Navbar preventAnimation={preventAnimation} />
    </header>
  );
}
