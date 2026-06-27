"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Product() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} castShadow>
        <torusKnotGeometry args={[0.9, 0.3, 220, 32]} />
        <meshStandardMaterial color="#fb7185" metalness={0.9} roughness={0.15} emissive="#e11d48" emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

export default function R3FProductTemplate() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-zinc-100 to-zinc-300 dark:from-zinc-900 dark:to-zinc-950">
      <div className="grid h-full lg:grid-cols-2">
        {/* Info */}
        <div className="z-10 flex flex-col justify-center p-10 sm:p-16">
          <span className="font-mono text-xs uppercase tracking-widest text-rose-500">New · 2026</span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The Halo
          </h1>
          <p className="mt-4 max-w-sm text-lg text-zinc-600 dark:text-zinc-400">
            Spin it. Inspect it. A fully interactive 3D product showcase rendered
            in real time with React Three Fiber.
          </p>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">$349</span>
            <span className="text-sm text-zinc-500 line-through">$429</span>
          </div>
          <button className="mt-6 h-12 w-fit rounded-xl bg-zinc-900 px-8 text-sm font-semibold text-white transition-transform hover:scale-105 dark:bg-zinc-100 dark:text-zinc-900">
            Add to cart
          </button>
        </div>

        {/* 3D canvas */}
        <div className="relative h-full">
          <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.6} />
            <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={250} castShadow />
            <pointLight position={[-5, -2, -3]} intensity={60} color="#38bdf8" />
            <Product />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={8} blur={2.5} far={3} />
            <EffectComposer>
              <Bloom luminanceThreshold={0.4} intensity={0.5} mipmapBlur />
            </EffectComposer>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
