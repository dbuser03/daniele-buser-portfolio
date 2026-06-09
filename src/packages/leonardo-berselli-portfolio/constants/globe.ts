export const GLOBE_DIMENSIONS = {
  width: 200,
  height: 200,
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
