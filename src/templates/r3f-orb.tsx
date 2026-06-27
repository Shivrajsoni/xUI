"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function ParticleOrb() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 4000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute points on a sphere shell with slight jitter.
      const r = 2 + (Math.sin(i) * 0.05);
      const theta = Math.acos(2 * ((i + 0.5) / count) - 1);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      arr[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      arr[i * 3 + 2] = r * Math.cos(theta);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.12;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#a855f7"
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

export default function R3FOrbTemplate() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ParticleOrb />
        <EffectComposer>
          <Bloom luminanceThreshold={0} intensity={1.1} mipmapBlur />
        </EffectComposer>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          Data, visualized
          <br />
          <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            in motion
          </span>
        </h1>
        <p className="mt-5 max-w-md text-lg text-white/60">
          4,000 GPU-rendered particles, orbiting in real time. Drag to explore.
        </p>
      </div>
    </div>
  );
}
