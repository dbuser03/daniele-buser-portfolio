export interface ProjectColor {
  hex: string;
  pantone: string;
  rgb?: string;
  name?: string;
}

export interface ProjectFontWeight {
  name: string;
  value: number | string;
  file?: string;
}

export interface ProjectFont {
  name: string;
  familyVar?: string;
  type: "sans" | "serif" | "mono" | "display" | string;
  weights: ProjectFontWeight[];
  sampleText?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  descriptionCol1: string;
  descriptionCol2: string;
  image: string;
  cardImage?: string;
  tags: [string, string, string, string];
  year: string;
  gallery?: string[];
  brandingColors: ProjectColor[];
  brandingFonts: ProjectFont[];

  hasCustomComponents?: boolean;
  hasCoolShit?: boolean;
  coolShitName?: string;
}
