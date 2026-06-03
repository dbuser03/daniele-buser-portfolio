export interface LayoutComponentProps {
  preventAnimation?: boolean;
}

export type HeaderProps = LayoutComponentProps;
export type FooterProps = LayoutComponentProps;
export type LogoProps = LayoutComponentProps;
export type NavbarProps = LayoutComponentProps;

export interface NavLink {
  href: string;
  label: string;
}

export interface NavItemProps extends NavLink {
  delay: number;
  preventAnimation: boolean;
}
