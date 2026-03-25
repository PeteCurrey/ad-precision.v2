"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Icosahedron, Line, Decal } from "@react-three/drei";

// 01 Web Design
export function WebDesignMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    // Parallax logic can be added here
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color="#C8F135" wireframe wireframeLinewidth={2} transparent opacity={0.3} />
    </mesh>
  );
}

// 02 AI Implementation
export function AINetwork() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create 40 random nodes
  const nodes = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
        pts.push(new THREE.Vector3(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
        ));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh position={pos} key={i}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#F2F2F0" />
        </mesh>
      ))}
      <Line
        points={nodes}
        color="#1A1A1F"
        lineWidth={2}
        dashed={false}
      />
    </group>
  );
}

// 03 SEO Globe
export function SEOGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 3]} />
      <meshBasicMaterial color="#222228" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

// 04 Paid Advertising
export function PaidBars() {
  const groupRef = useRef<THREE.Group>(null);
  const bars = [1, 2.5, 1.5, 3.5, 2, 4.5, 3];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[-2, -2, 0]}>
      {bars.map((h, i) => (
        <mesh key={i} position={[i * 0.8, h / 2, 0]}>
          <boxGeometry args={[0.5, h, 0.5]} />
          <meshStandardMaterial color="#C8F135" />
        </mesh>
      ))}
    </group>
  );
}

// 05 Analytics Stream
export function AnalyticsStream() {
  const lineRef = useRef<any>(null);

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 50; i++) {
        pts.push(new THREE.Vector3(
            i * 0.2 - 5,
            Math.sin(i * 0.2) * 2,
            Math.cos(i * 0.2) * 2
        ));
    }
    return pts;
  }, []);

  useFrame((state) => {
    // Flowing tube logic here
    if (lineRef.current) {
       lineRef.current.material.dashOffset -= 0.01;
    }
  });

  return (
      <Line
        ref={lineRef}
        points={points}
        color="#C8F135"
        lineWidth={5}
        dashed={true}
        dashSize={1}
        dashOffset={0}
        dashScale={2}
      />
  );
}
