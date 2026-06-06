import * as THREE from "three";

export function getAsciiColorFromCSS(isDark: boolean): THREE.Color {
  const root = document.documentElement;
  const cssVar = isDark ? "--ascii-color-dark" : "--ascii-color-light";
  const value = getComputedStyle(root).getPropertyValue(cssVar).trim();
  return new THREE.Color(value || (isDark ? "#c8c8c8" : "#0a0a0a"));
}

export function createAsciiAtlas(): THREE.CanvasTexture | null {
  const canvas = document.createElement("canvas");
  const waterChars = " .',-~:;=+";
  const landChars = "*coOa&8%#@";
  const totalChars = waterChars + landChars;
  const numChars = totalChars.length;

  const fontSize = 64;
  canvas.width = fontSize * numChars;
  canvas.height = fontSize;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < numChars; i++) {
    ctx.fillText(totalChars[i], i * fontSize + fontSize / 2, fontSize / 2 + 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

const ASCII_UNIFORM_DECLARATION = `#include <common>
        uniform sampler2D asciiAtlas;
        uniform float charSize;
        uniform vec2 resolution;
        uniform vec3 asciiColor;
`;

const ASCII_FRAGMENT_REPLACEMENT = `#include <dithering_fragment>

        vec2 screenCoord = gl_FragCoord.xy;
        vec2 cellUv = fract(screenCoord / charSize);
        cellUv.y = 1.0 - cellUv.y;

        vec3 finalColor = gl_FragColor.rgb;
        float luma = dot(finalColor, vec3(0.299, 0.587, 0.114));

        float isWater = specularStrength;
        float charIndex = 0.0;

        if (isWater > 0.5) {
            float waterLuma = clamp((luma - 0.0) / 0.35, 0.0, 1.0);
            waterLuma = pow(waterLuma, 0.75);
            charIndex = floor(waterLuma * 9.99);
        } else {
            float landLuma = clamp((luma - 0.05) / 0.50, 0.0, 1.0);
            landLuma = pow(landLuma, 0.4);
            charIndex = 10.0 + floor(landLuma * 9.99);
        }

        float charWidth = 1.0 / 20.0;
        vec2 atlasUv = vec2((charIndex * charWidth) + (cellUv.x * charWidth), cellUv.y);
        vec4 asciiTexel = texture2D(asciiAtlas, atlasUv);

        if (asciiTexel.r < 0.2) discard;

        float alpha = gl_FragColor.a;
        gl_FragColor = vec4(asciiColor, alpha);
`;

export interface AsciiUniforms {
  asciiAtlas: { value: THREE.CanvasTexture | null };
  charSize: { value: number };
  resolution: { value: THREE.Vector2 };
  asciiColor: { value: THREE.Color };
}

export function patchGlobeShader(
  shader: THREE.WebGLProgramParametersWithUniforms,
  uniforms: AsciiUniforms,
) {
  shader.uniforms.asciiAtlas = uniforms.asciiAtlas;
  shader.uniforms.charSize = uniforms.charSize;
  shader.uniforms.resolution = uniforms.resolution;
  shader.uniforms.asciiColor = uniforms.asciiColor;

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    ASCII_UNIFORM_DECLARATION,
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <dithering_fragment>",
    ASCII_FRAGMENT_REPLACEMENT,
  );
}
