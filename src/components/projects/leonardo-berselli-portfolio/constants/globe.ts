import earthDay from "@/components/projects/leonardo-berselli-portfolio/textures/earth_atmos_2048.jpg";
import earthNormal from "@/components/projects/leonardo-berselli-portfolio/textures/earth_normal_2048.jpg";
import earthSpecular from "@/components/projects/leonardo-berselli-portfolio/textures/earth_specular_2048.jpg";

export const GLOBE_TEXTURES = {
  earthDay: earthDay.src,
  earthNormal: earthNormal.src,
  earthSpecular: earthSpecular.src,
} as const;

export const GLOBE_CONFIG = {
  cameraFov: 35,
  cameraZ: 8.5,
  ambientLightIntensity: 2.0,
  globeScale: 2.4,
  sphereSegments: 96,
  rotationSpeed: 0.0015,
  pixelRatioMax: 2,
  asciiCharSizeMultiplier: 4.0,
} as const;
