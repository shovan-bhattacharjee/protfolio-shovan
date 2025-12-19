"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Text, Float } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 50000;
const generateParticles = () => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 150;      // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 150;  // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 120 - 40; // Z
  }
  return positions;
};

const STATIC_POSITIONS = generateParticles();

const TECH_TERMS_LIST = [
    "{ }", "<div>", "npm", "git", "&&", "||", "=>", "[]", "const", "async",
    "TS", "JS", "Python", "Rust", "Go", "SQL", "C++",
    "Void", "Null", "NaN", "0x00", "True", "False",
    "sudo", "404", "200 OK", "rm -rf", "push", "deploy"
];

const FLOATING_TERMS = TECH_TERMS_LIST.map((term) => ({
  label: term,
  position: [
    (Math.random() - 0.5) * 80,
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 60 - 20 
  ] as [number, number, number],
  fontSize: Math.random() * 0.8 + 0.4
}));

export const CyberBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0b0f14] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 50 }} 
        gl={{ antialias: true, alpha: true }} 
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={["#0b0f14", 30, 100]} />
        <ambientLight intensity={0.6} />
        
        <SceneWrapper>
          <StarField />
          <DigitalGrid />
        </SceneWrapper>

        <Suspense fallback={null}>
          <FloatingTechTerms />
        </Suspense>
      </Canvas>
    </div>
  );
};

const SceneWrapper = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.mouse.y * 0.1;
    const targetY = state.mouse.x * 0.1;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02;
  });

  return <group ref={groupRef}>{children}</group>;
};


const StarField = () => {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => new Float32Array(STATIC_POSITIONS), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const speed = 5.0 * delta; 
    
    const positionsArray = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positionsArray[i3 + 2] += speed;

      if (positionsArray[i3 + 2] > 30) {
        positionsArray[i3 + 2] = -100;
        positionsArray[i3] = (Math.random() - 0.5) * 150;
        positionsArray[i3 + 1] = (Math.random() - 0.5) * 150;
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.z += delta * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffea"
        size={0.05} 
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const DigitalGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame((state, delta) => {
    if (!gridRef.current) return;
    
    const speed = 3.0 * delta;

    gridRef.current.position.z += speed;

    if (gridRef.current.position.z > 2) {
      gridRef.current.position.z = 0;
    }
  });

  return (
    <group position={[0, -15, -20]} rotation={[0.15, 0, 0]}> 
      <gridHelper 
        ref={gridRef} 
        args={[160, 80, 0x047857, 0x022c22]} 
        position={[0, 0, 0]} 
      />
    </group>
  );
};

const FloatingTechTerms = () => {
  return (
    <>
      {FLOATING_TERMS.map((item, i) => (
        <Float 
          key={i} 
          speed={1.5} 
          rotationIntensity={0.5} 
          floatIntensity={1} 
          position={item.position}
        >
          <Text
            fontSize={item.fontSize}
            color="#10b981"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.25}
          >
            {item.label}
          </Text>
        </Float>
      ))}
    </>
  );
};