export interface NavLink {
  href: string;
  label: string;
}

export interface NavItemProps extends NavLink {
  delay: number;
}
