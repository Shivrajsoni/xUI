"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Knot({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.elapsedTime * 0.3;
      ref.current.rotation.y = s.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[0.5, 0.18, 160, 24]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.15} emissive={color} emissiveIntensity={0.25} />
      </mesh>
    </Float>
  );
}

export default function R3FTextTemplate() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 6]} intensity={120} color="#f0abfc" />
        <pointLight position={[-6, -4, 2]} intensity={90} color="#38bdf8" />
        <Knot position={[-2.6, 1, 0]} color="#a855f7" scale={0.9} />
        <Knot position={[2.7, -0.6, -1]} color="#f43f5e" scale={1.1} />
        <Knot position={[1.6, 1.8, -2]} color="#38bdf8" scale={0.7} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={0.9} mipmapBlur />
        </EffectComposer>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-black tracking-tighter sm:text-8xl">
          MAKE IT
          <br />
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">POP</span>
        </h1>
        <p className="mt-5 max-w-md text-lg text-white/60">
          Floating 3D geometry with bloom — a bold, animated hero built on React Three Fiber.
        </p>
        <button className="pointer-events-auto mt-8 h-11 rounded-full bg-white px-7 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105">
          Explore
        </button>
      </div>
    </div>
  );
}
