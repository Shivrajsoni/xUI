"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Blob() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <Icosahedron ref={ref} args={[1.5, 12]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#6d28d9"
          emissiveIntensity={0.45}
          roughness={0.08}
          metalness={0.65}
          distort={0.45}
          speed={2.2}
        />
      </Icosahedron>
    </Float>
  );
}

export default function R3FHeroTemplate() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={120} color="#f0abfc" />
        <pointLight position={[-5, -3, -5]} intensity={90} color="#38bdf8" />
        <Blob />
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} intensity={0.9} mipmapBlur />
        </EffectComposer>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="pointer-events-auto rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur">
          Powered by three.js
        </span>
        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          Build worlds in
          <br />
          <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-sky-300 bg-clip-text text-transparent">
            three dimensions
          </span>
        </h1>
        <p className="mt-5 max-w-md text-lg text-white/60">
          A real-time WebGL hero. Drag to orbit. Built with React Three Fiber.
        </p>
        <div className="pointer-events-auto mt-8 flex gap-3">
          <button className="h-11 rounded-xl bg-white px-6 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105">
            Get started
          </button>
          <button className="h-11 rounded-xl border border-white/15 px-6 text-sm font-medium text-white/90 hover:bg-white/5">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
