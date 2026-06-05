"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const EARTH_DAY_URL = "./textures/earth_atmos_2048.jpg";
const EARTH_NORMAL_URL = "./textures/earth_normal_2048.jpg";
const EARTH_SPECULAR_URL = "./textures/earth_specular_2048.jpg";

function createAsciiAtlas() {
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

function getAsciiColor(dark: boolean) {
  return new THREE.Color(dark ? "#c8c8c8" : "#0a0a0a");
}

interface EarthGlobeAsciiProps {
  dark?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function EarthGlobeAscii({
  dark,
  onDragStart,
  onDragEnd,
}: EarthGlobeAsciiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark =
      dark ?? window.matchMedia("(prefers-color-scheme: dark)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);
    scene.add(new THREE.AmbientLight(0xffffff, 2.0));
    scene.add(camera);

    const loader = new THREE.TextureLoader();
    const dayTexture = loader.load(EARTH_DAY_URL);
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    const normalTexture = loader.load(EARTH_NORMAL_URL);
    const specularTexture = loader.load(EARTH_SPECULAR_URL);
    const asciiTexture = createAsciiAtlas();

    const uniforms = {
      asciiAtlas: { value: asciiTexture },
      charSize: { value: 4.0 * Math.min(window.devicePixelRatio || 1, 2) },
      resolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
      asciiColor: { value: getAsciiColor(isDark) },
    };

    const globeMaterial = new THREE.MeshPhongMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      specularMap: specularTexture,
      transparent: true,
    });

    globeMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.asciiAtlas = uniforms.asciiAtlas;
      shader.uniforms.charSize = uniforms.charSize;
      shader.uniforms.resolution = uniforms.resolution;
      shader.uniforms.asciiColor = uniforms.asciiColor;

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        uniform sampler2D asciiAtlas;
        uniform float charSize;
        uniform vec2 resolution;
        uniform vec3 asciiColor;`,
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
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
        gl_FragColor = vec4(asciiColor, alpha);`,
      );
    };

    const sphereGeometry = new THREE.SphereGeometry(1, 96, 96);
    const globe = new THREE.Mesh(sphereGeometry, globeMaterial);
    globe.scale.setScalar(0.8);
    scene.add(globe);

    const controls = new OrbitControls(camera, container);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    let isInteracting = false;
    controls.addEventListener("start", () => {
      container.style.cursor = "grabbing";
      isInteracting = true;
      onDragStart?.();
    });
    controls.addEventListener("end", () => {
      container.style.cursor = "default";
      isInteracting = false;
      onDragEnd?.();
    });

    const onResize = () => {
      if (!renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      uniforms.resolution.value.set(width, height);
    };

    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    let animationId = 0;
    let disposed = false;

    const animate = () => {
      if (disposed) return;
      if (!isInteracting) globe.rotation.y += 0.0015;
      controls.update();
      renderer?.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    renderer.domElement.style.display = "block";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    onResize();
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer?.dispose();
      if (renderer?.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      sphereGeometry.dispose();
      globeMaterial.dispose();
      dayTexture.dispose();
      normalTexture.dispose();
      specularTexture.dispose();
      if (asciiTexture) asciiTexture.dispose();
    };
  }, [dark, onDragStart, onDragEnd]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
