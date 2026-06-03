import { Project } from "@/types/projects";
import { PROJECT_TAGS } from "@/constants/projects";

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "portfolio-website",
    title: "Portfolio Website",
    image:
      "/projects/portfolio-website/1c86b508-418c-41d3-9cb7-f96076ec9317.jpg",
    tags: [
      PROJECT_TAGS.WEB_DEVELOPMENT,
      PROJECT_TAGS.WEB_DESIGN,
      PROJECT_TAGS.BRANDING,
    ],
    year: 2025,
    description:
      "Personal portfolio built with Next.js and Tailwind CSS to showcase selected projects, case studies, and contact information. Focuses on accessible responsive layouts, fast loading, and typographic refinement.",
  },
  {
    id: "2",
    slug: "ignition-finance",
    title: "Ignition Finance",
    image:
      "/projects/ignition-finance/02e35f75-9dcf-4e12-a6d7-c1ea7f8d0b9f.jpg",
    tags: [
      PROJECT_TAGS.MOBILE_DEVELOPMENT,
      PROJECT_TAGS.UI_UX_DESIGN,
      PROJECT_TAGS.BRANDING,
    ],
    year: 2024,
    description:
      "Mobile-first finance app concept for retail investors: portfolio tracking, simple order flows, performance charts, and secure authentication. Worked on UI components, data visualization and onboarding flows.",
  },
  {
    id: "3",
    slug: "societa-svizzera-di-milano",
    title: "Società Svizzera di Milano",
    image:
      "/projects/societa-svizzera-di-milano/66c68f53-9314-4863-9de8-65979c97df8d.jpg",
    tags: [
      PROJECT_TAGS.GRAPHIC_DESIGN,
      PROJECT_TAGS.LOGO_DESIGN,
      PROJECT_TAGS.BRANDING,
    ],
    year: 2025,
    description:
      "Branding and print design for the Società Svizzera di Milano — poster series, event materials and signage. Emphasis on typographic hierarchy, Swiss-style grid layouts and a refined color system for cultural programming.",
  },
];
