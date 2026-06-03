export interface NavLink {
  href: string;
  label: string;
}

export interface NavbarProps {
  variant?: "dark" | "light";
  preventAnimation?: boolean;
}
