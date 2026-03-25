"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec3 uMouse;
uniform float uIsMouseActive;

attribute float aRandomPhase;
attribute float aRandomOpacity;

varying float vOpacity;

void main() {
  vec3 pos = position;

  // Gentle sinusoidal drift
  pos.x += sin(uTime * 0.2 + aRandomPhase) * 0.5;
  pos.y += cos(uTime * 0.3 + aRandomPhase) * 0.5;
  pos.z += sin(uTime * 0.1 + aRandomPhase) * 0.5;

  // Repel logic based on 3D mouse position (120px radius ~ adjusted to normalized 3D units)
  if (uIsMouseActive > 0.5) {
      float dist = distance(pos, uMouse);
      float maxDist = 4.0; // ~200px mapped
      if (dist < maxDist) {
          vec3 dir = normalize(pos - uMouse);
          float force = (maxDist - dist) / maxDist; // 0 to 1
          pos += dir * force * 0.5; // push away
      }
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  // Dynamic point sizing based on depth
  gl_PointSize = clamp(400.0 / -mvPosition.z, 0.5, 2.0);
  gl_Position = projectionMatrix * mvPosition;
  
  vOpacity = aRandomOpacity;
}
`;

const fragmentShader = `
varying float vOpacity;

void main() {
  // Distance from center of point
  float dist = distance(gl_PointCoord, vec2(0.5));
  if (dist > 0.5) discard; // Make it a circle

  vec3 color = vec3(0.949, 0.949, 0.941); // #F2F2F0
  
  // Soft edge calculation
  float alpha = smoothstep(0.5, 0.1, dist) * vOpacity;
  
  gl_FragColor = vec4(color, alpha);
}
`;

export default function ParticleField({ count = 8000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Widespread distribution across a flat-ish 3D plane
      positions[i * 3] = (Math.random() - 0.5) * 40;     // X width
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // Y height
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z depth

      phases[i] = Math.random() * Math.PI * 2;
      opacities[i] = 0.15 + Math.random() * 0.25; // 15-40% opacity
    }

    return { positions, phases, opacities };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 0) },
    uIsMouseActive: { value: 0.0 }
  }), []);

  // Track mouse in document and map to 3D roughly
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const onMouseMove = (e: MouseEvent) => {
      // Map screen coords to -1 .. 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Rough projection map at z=0 (assumes camera position roughly z=10)
      uniforms.uMouse.value.set(x * 20, y * 15, 0);
      uniforms.uIsMouseActive.value = 1.0;
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        uniforms.uIsMouseActive.value = 0.0;
      }, 500);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timeout);
    };
  }, [uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomPhase"
          args={[particles.phases, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandomOpacity"
          args={[particles.opacities, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
