"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Dodecahedron, Edges, Line } from "@react-three/drei";
import * as THREE from "three";

export function AIDodecahedron() {
  const groupRef = useRef<THREE.Group>(null);
  const satellites = useRef<THREE.Mesh[]>([]);
  const lines = useRef<THREE.Line[]>([]);

  const orbits = useMemo(() => {
    return Array(8).fill(0).map(() => ({
      radius: 2.5 + Math.random() * 2,
      speed: 0.3 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      yOffset: (Math.random() - 0.5) * 3
    }));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.z += delta * 0.05;
    }

    satellites.current.forEach((sat, i) => {
      const orbit = orbits[i];
      orbit.angle += delta * orbit.speed;
      
      const x = Math.cos(orbit.angle) * orbit.radius;
      const z = Math.sin(orbit.angle) * orbit.radius;
      const y = orbit.yOffset + Math.sin(orbit.angle * 2) * 0.5;
      
      sat.position.set(x, y, z);
      
      if (lines.current[i]) {
        const positions = new Float32Array([0, 0, 0, x, y, z]);
        lines.current[i].geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      }
    });
  });

  return (
    <group ref={groupRef}>
      <Dodecahedron args={[1.5, 0]}>
        <meshPhysicalMaterial 
          transmission={0.8} 
          opacity={1} 
          transparent
          roughness={0.1}
          metalness={0.3}
          color="#1A1A1F"
        />
        <Edges scale={1.0} threshold={15} color="#C8F135" />
      </Dodecahedron>

      {orbits.map((_, i) => (
        <group key={i}>
          <mesh ref={(el) => { if (el) satellites.current[i] = el; }}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#F2F2F0" />
          </mesh>
          <line ref={(el) => { if (el) lines.current[i] = el as any; }}>
            <bufferGeometry />
            <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </line>
        </group>
      ))}
    </group>
  );
}
