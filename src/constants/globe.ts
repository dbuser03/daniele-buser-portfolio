export const GLOBE_TEXTURES = {
  earthDay:
    "/projects/leonardo-berselli-portfolio/textures/earth_atmos_2048.jpg",
  earthNormal:
    "/projects/leonardo-berselli-portfolio/textures/earth_normal_2048.jpg",
  earthSpecular:
    "/projects/leonardo-berselli-portfolio/textures/earth_specular_2048.jpg",
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
