"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, MeshDistortMaterial, Float } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

export const CyberBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0b0f14]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <group rotation={[0, 0, Math.PI / 4]}>
          <PointsWrapper />
        </group>
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#10b981" />
        
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <CyberCore />
        </Float>
      </Canvas>
    </div>
  );
};

const PointsWrapper = (props: any) => {
  const ref = useRef<any>();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const CyberCore = () => {
    return (
        <mesh position={[0.5, 0, -2]} scale={[0.4, 0.4, 0.4]}>
            <icosahedronGeometry args={[1, 4]} />
            <MeshDistortMaterial
                color="#10b981"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0}
                metalness={0.8}
                wireframe
            />
        </mesh>
    );
}