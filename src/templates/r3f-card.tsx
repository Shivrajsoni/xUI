"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, ContactShadows, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function CreditCard() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.4) * 0.6;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.4}>
      <group ref={ref} rotation={[0.3, 0, 0]}>
        {/* card body */}
        <RoundedBox args={[3.2, 2, 0.08]} radius={0.12} smoothness={6}>
          <meshStandardMaterial color="#7c3aed" metalness={0.85} roughness={0.2} emissive="#5b21b6" emissiveIntensity={0.15} />
        </RoundedBox>
        {/* chip */}
        <mesh position={[-1, 0.45, 0.05]}>
          <boxGeometry args={[0.45, 0.35, 0.02]} />
          <meshStandardMaterial color="#fcd34d" metalness={1} roughness={0.25} />
        </mesh>
        {/* magnetic stripe */}
        <mesh position={[0, -0.55, 0.05]}>
          <boxGeometry args={[3, 0.3, 0.02]} />
          <meshStandardMaterial color="#1e1b4b" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function R3FCardTemplate() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="grid h-full lg:grid-cols-2">
        <div className="z-10 flex flex-col justify-center p-10 sm:p-16">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-400">xUI Pay</span>
          <h1 className="mt-4 text-5xl font-bold tracking-tight">Banking that feels like the future</h1>
          <p className="mt-4 max-w-sm text-lg text-white/60">
            A real-time 3D card you can spin and inspect — rendered with React Three Fiber.
          </p>
          <div className="mt-8 flex gap-3">
            <button className="h-11 rounded-xl bg-white px-6 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105">Open account</button>
            <button className="h-11 rounded-xl border border-white/15 px-6 text-sm font-medium text-white/90 hover:bg-white/5">Learn more</button>
          </div>
        </div>
        <div className="relative h-full min-h-[50vh]">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} shadows>
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={250} />
            <pointLight position={[-5, -2, 2]} intensity={80} color="#a855f7" />
            <CreditCard />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.45} scale={9} blur={2.6} far={3} />
            <EffectComposer>
              <Bloom luminanceThreshold={0.45} intensity={0.5} mipmapBlur />
            </EffectComposer>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
