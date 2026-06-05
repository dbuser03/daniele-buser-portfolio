export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  year: string;
  href: string;
  role?: string;
  websiteUrl?: string;
  githubUrl?: string;
  gallery?: string[];
  brandingColors?: string[];
  brandingFontName?: string;
  brandingFontFamily?: string;
}

