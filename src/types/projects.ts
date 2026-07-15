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

export interface TreeNode {
  name: string;
  type: "dir" | "file";
  children?: TreeNode[];
}

export interface TechToken {
  text: string;
  isKeyword?: boolean;
  id?: string;
  href?: string;
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

  architectureTree?: TreeNode[];
  showcaseFiles?: Record<string, string>;
  architectureDescriptions?: Record<string, string>;
  codeTechnologiesText?: string[];
  codeTechnologiesDescription?: string;
  codeTechnologiesTokens?: TechToken[];

  isHidden?: boolean;
  hasCustomComponents?: boolean;
  hasCoolShit?: boolean;
  coolShitName?: string;
  shipImage1?: string;
  shipImage2?: string;
  shipText1?: string;
  shipText2?: string;

  labels?: {
    intro?: string;
    design?: string;
    code?: string;
    ship?: string;
  };
  hasCustomDesignSection?: boolean;
  hasCustomCodeSection?: boolean;
  hasCustomShipSection?: boolean;
}
