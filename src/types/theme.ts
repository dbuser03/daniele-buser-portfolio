import { CSS_VARIABLES } from "@/constants/theme";

export type CSSVariable = (typeof CSS_VARIABLES)[keyof typeof CSS_VARIABLES];

export type ThemeVariant = "dark" | "light";
