import Logo from "./Logo";
import Navbar from "./Navbar";
export default function Header() {
  return (
    <header className="fixed top-0 z-30 flex w-full flex-row justify-between p-4 mix-blend-difference">
      <Logo />
      <Navbar />
    </header>
  );
}
