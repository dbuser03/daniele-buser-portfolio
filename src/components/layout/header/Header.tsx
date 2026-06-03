import React from "react";
import Logo from "@/components/layout/header/Logo";
import Navbar from "@/components/layout/header/Navbar";
import { HeaderProps } from "@/types/layout/header/header";

const Header: React.FC<HeaderProps> = ({
  variant = "dark",
  preventAnimation = false,
}) => {
  return (
    <header className="fixed top-0 z-30 flex w-full flex-row justify-between p-4">
      <Logo variant={variant} preventAnimation={preventAnimation} />
      <Navbar variant={variant} preventAnimation={preventAnimation} />
    </header>
  );
};

export default Header;
