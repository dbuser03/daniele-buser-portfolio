"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLOBE_TEXTURES, GLOBE_CONFIG } from "@/components/projects/leonardo-berselli-portfolio-components/constants/globe";
import {
  createAsciiAtlas,
  getAsciiColorFromCSS,
  patchGlobeShader,
  type AsciiUniforms,
} from "@/components/projects/leonardo-berselli-portfolio-components/shaders/asciiGlobe";

interface UseEarthGlobeOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  dark?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export function useEarthGlobe({
  containerRef,
  dark: darkProp,
  onDragStart,
  onDragEnd,
}: UseEarthGlobeOptions) {
  const asciiColorRef = useRef<THREE.Color | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark =
      darkProp ?? window.matchMedia("(prefers-color-scheme: dark)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      GLOBE_CONFIG.cameraFov,
      1,
      0.1,
      100,
    );
    camera.position.set(0, 0, GLOBE_CONFIG.cameraZ);

    scene.add(new THREE.AmbientLight(0xffffff, GLOBE_CONFIG.ambientLightIntensity));
    scene.add(camera);

    const loader = new THREE.TextureLoader();

    const dayTexture = loader.load(GLOBE_TEXTURES.earthDay);
    dayTexture.colorSpace = THREE.SRGBColorSpace;

    const normalTexture = loader.load(GLOBE_TEXTURES.earthNormal);
    const specularTexture = loader.load(GLOBE_TEXTURES.earthSpecular);

    const asciiTexture = createAsciiAtlas();

    const uniforms: AsciiUniforms = {
      asciiAtlas: { value: asciiTexture },
      charSize: {
        value:
          GLOBE_CONFIG.asciiCharSizeMultiplier *
          Math.min(window.devicePixelRatio || 1, GLOBE_CONFIG.pixelRatioMax),
      },
      resolution: {
        value: new THREE.Vector2(
          container.clientWidth,
          container.clientHeight,
        ),
      },
      asciiColor: { value: getAsciiColorFromCSS(isDark) },
    };
    asciiColorRef.current = uniforms.asciiColor.value;

    const globeMaterial = new THREE.MeshPhongMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      specularMap: specularTexture,
      transparent: true,
    });

    globeMaterial.onBeforeCompile = (shader) => {
      patchGlobeShader(shader, uniforms);
    };

    const sphereGeometry = new THREE.SphereGeometry(
      1,
      GLOBE_CONFIG.sphereSegments,
      GLOBE_CONFIG.sphereSegments,
    );

    const globe = new THREE.Mesh(sphereGeometry, globeMaterial);
    globe.scale.setScalar(GLOBE_CONFIG.globeScale);
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

    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number | null = null;
    let disposed = false;

    const animate = () => {
      if (!isInteracting) {
        globe.rotation.y += GLOBE_CONFIG.rotationSpeed;
      }
      controls.update();
      renderer?.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    const setup = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      if (disposed || !renderer) {
        renderer?.dispose();
        return;
      }

      renderer.domElement.style.display = "block";
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, GLOBE_CONFIG.pixelRatioMax),
      );
      container.appendChild(renderer.domElement);

      onResize();
      window.addEventListener("resize", onResize);
      animate();
    };

    setup();

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);

      if (animationId !== null) window.cancelAnimationFrame(animationId);
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
      asciiColorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, darkProp]);
}
