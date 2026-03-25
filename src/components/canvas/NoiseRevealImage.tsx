"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { gsap } from "@/lib/gsap";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;
varying vec2 vUv;

// Simple 2D noise
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec4 tex = texture2D(uTexture, vUv);
  
  // Noise displacement based on progress (1.0 = invisible noise, 0.0 = fully clear)
  float noise = random(vUv * (10.0 + uProgress * 20.0)) * uProgress;
  
  // Calculate if this pixel should be discarded or distorted based on threshold
  if (noise > (1.0 - uProgress) * 0.5 && uProgress > 0.0) {
     discard;
  }
  
  // Glitch the RGB slightly during transition
  float r = texture2D(uTexture, vUv + vec2(noise * 0.05, 0.0)).r;
  float g = texture2D(uTexture, vUv).g;
  float b = texture2D(uTexture, vUv - vec2(noise * 0.05, 0.0)).b;
  
  // Mix toward the final texture as progress approaches 0
  vec4 finalColor = mix(vec4(r, g, b, tex.a), tex, 1.0 - uProgress);
  
  // Fade in completely
  finalColor.a *= (1.0 - uProgress);
  
  if (uProgress >= 0.99) discard; // fully transparent when not started

  gl_FragColor = finalColor;
}
`;

export default function NoiseRevealImage({ src }: { src: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Generate a procedural texture if no URL is valid (avoids loading errors)
  const fallbackTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#1A1A1F";
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = "#0E0E13";
      for(let i=0; i<500; i++) {
         ctx.fillRect(Math.random()*512, Math.random()*512, 2, 2);
      }
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const uniforms = useMemo(() => ({
    uTexture: { value: fallbackTexture },
    uTime: { value: 0 },
    uProgress: { value: 1.0 } // 1 = noisy/hidden, 0 = visible
  }), [fallbackTexture]);

  useEffect(() => {
    // Attempt to load the actual texture if provided
    if (src) {
        new THREE.TextureLoader().load(src, (tex) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            uniforms.uTexture.value = tex as any;
        });
    }
    
    // Trigger transition when mounted
    let ctx = gsap.context(() => {
      gsap.to(uniforms.uProgress, {
        value: 0.0,
        duration: 2.5,
        ease: "power2.out",
        delay: 0.5
      });
    });

    return () => ctx.revert();
  }, [src, uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}
